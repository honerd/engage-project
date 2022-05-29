
from lib2to3.pgen2 import token
from os import access
import flask
from flask import Flask, request, send_from_directory, url_for, session, redirect,jsonify
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from datetime import time
import time
from flask_cors import CORS, cross_origin
import pandas as pd
import recommendations
from dotenv import load_dotenv
import os
import pickle
from sklearn.preprocessing import MinMaxScaler

load_dotenv()

client_id=os.getenv("CLIENT_ID")
client_secret=os.getenv("CLIENT_SECRET")

app = Flask(__name__)
CORS(app)

app.secret_key='abcd1234'
app.config['SESSION_COOKIE_NAME']='Yash cookie'
TOKEN_INFO='token_info'

final_df = pd.read_csv('final_df.csv')

def split_columns(df,column_name,new_column_prefix):

    ds=pd.get_dummies(df[column_name].apply(pd.Series).stack()).sum(level=0)
    names_of_attributes=ds.columns
    ds.columns=[str(column_name)+"|"+str(i) for i in names_of_attributes]
    ds.reset_index(drop=True, inplace=True)
    return ds

def create_feature_set(df,cols_to_be_scaled):
    tfidf=pickle.load(open('tfidf_object.pk','rb'))
    tfidf_matrix=pickle.load(open('finalized_model.sav', 'rb'))
    #for only the genre list
    genre_df = pd.DataFrame(tfidf_matrix.toarray())
    genre_df.columns = ['genre' + "|" + i for i in tfidf.get_feature_names_out()]
    genre_df.reset_index(drop = True, inplace=True)
    
    #creating vectors for the popularity and years and keeping values between 0 and 1 
    years=split_columns(df,'year','year')*0.5
    popularity=split_columns(df,'popularity_outof10','popularity')*0.5
    
    #scale float columns
    floats = df[cols_to_be_scaled].reset_index(drop = True)
    scaler = MinMaxScaler()
    floats_scaled = pd.DataFrame(scaler.fit_transform(floats), columns = floats.columns) 
    
    #concatenating in the final part
    ds=pd.concat([genre_df,floats_scaled,years,popularity], axis=1)
    ds['id']=df['id'].values
    
    return ds

cols_to_be_scaled=final_df.dtypes[final_df.dtypes=='float64'].index.values
feature_set=create_feature_set(final_df,cols_to_be_scaled)


@app.route('/login')
@cross_origin()
def login():
    sp_oauth=create_spotify_oauth()
    auth_url=sp_oauth.get_authorize_url()
    redirect(auth_url)
    session.clear()
    code=request.args.get('code')
    token_info=sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(os.getenv("HOMEPAGE"))


@app.route('/hometoken')
def getinitialtoken():
    try:
        token_info=get_token()
    except:
        print('user not logged in')
        return redirect('/login')
    return {"token_info": token_info}

@app.route('/gettracks')
def gettracks():
    try:
        token_info=get_token()
    except:
        print('user not logged in')
        return redirect('/login')
    # token_info=get_token()
    sp=spotipy.Spotify(auth=token_info['access_token'])
    
    return {'details':sp.current_user_recently_played()['items']}
    # return 'tracks'

@app.route('/getplaylist')
def getplaylist():
    try:
        token_info=get_token()
    except:
        print('user not logged in')
        return redirect('/login')
    sp=spotipy.Spotify(auth=token_info['access_token'])
    
    return {'playlist': sp.current_user_playlists()['items']}
    
    
@app.route('/getplaysong',methods=["POST","GET"])
def getplaysong():
    try:
        token_info=get_token()
    except:
        print('user not logged in')
        return redirect('/login')
    sp=spotipy.Spotify(auth=token_info['access_token'])
    data = request.get_json()
    id=data['id']
    trackuri=sp.track(id)['uri']
    return{'trackuri':trackuri, "access_token":token_info['access_token']}
    

    

def get_token():
    token_info=session.get(TOKEN_INFO, None)
    if not token_info:
        raise 'exception'
    now =int(time.time())
    is_expired = token_info['expires_at']-now<60
    if(is_expired):
        sp_oauth=create_spotify_oauth()
        token_info=sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info




def create_spotify_oauth():
    return SpotifyOAuth(client_id=client_id, client_secret=client_secret, redirect_uri=url_for('login',_external=True), scope='user-library-read streaming user-read-recently-played user-read-playback-state user-modify-playback-state')

app.run(debug=True)

@app.route('/getplaylistsongs', methods=['POST', 'GET'])
def getplaylistsongs():
    data=request.get_json()
    try:
        token_info=get_token()
    except:
        print('user not logged in')
        return redirect('/login')
    sp=spotipy.Spotify(auth=token_info['access_token'])
    playlist_info=sp.playlist(data['id'])

    
    return playlist_info

@app.route('/getrecommendations',methods=['POST', 'GET'])
def getrecommendations():
    try:
        token_info=get_token()
    except:
        print('user not logged in')
        return redirect('/login')
    sp=spotipy.Spotify(auth=token_info['access_token'])
    data=request.get_json()
    playlist_df=pd.DataFrame()
    if data['type']=='mainpart':
        playlist_df=recommendations.create_recent_df(sp,feature_set,final_df)
    else:
        playlist_df=recommendations.create_playlist_df(sp,data['id'],feature_set,final_df)
    
    
    return playlist_df.to_json(orient='records')

