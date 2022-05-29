import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import datetime
from datetime import datetime
from math import floor


def create_playlist_df(sp, id, featureset,final_df):
    playlist_in = pd.DataFrame()
    for num, i in enumerate(sp.playlist(id)['tracks']['items']):
        playlist_in.loc[num, 'artist'] = i['track']['artists'][0]['name']
        playlist_in.loc[num, 'name'] = i['track']['name']
        playlist_in.loc[num, 'id'] = i['track']['id']  # ['uri'].split(':')[2]
        playlist_in.loc[num, 'url'] = i['track']['album']['images'][1]['url']
        playlist_in.loc[num, 'date_added'] = i['added_at']
    playlist_in['date_added'] = pd.to_datetime(playlist_in['date_added'])

    playlist_in = playlist_in[playlist_in['id'].isin(
        featureset['id'].values)].sort_values('date_added', ascending=False)
    

    # now we will configure this function with date added to generate a proper dataset
    find_days_weights_index(playlist_in)
    

    # now we will create a vector for this playlist
    final_vector_playlist = create_vector_for_playlist(featureset, playlist_in)
    

    # now we pass in to check cosine similarity and return the top 10 songs in recommendations
    non_playlist = songs_not_in_playlist_featureset(featureset, playlist_in)
   

   
    recommendation = recommended_songs(
        final_df, non_playlist, final_vector_playlist, sp)
    return recommendation


def find_days_weights_index(playlist_set):
    now = datetime.now()
    date_list = []
    for i in playlist_set['date_added']:
        if floor(((now.date()-i.date()).days/7)) < 52:
            date_list.append((52-(floor((now.date()-i.date()).days/7)))/52)
        else:
            date_list.append(0)
    playlist_set['weeks_passed'] = date_list


def create_vector_for_playlist(feature_set, playlist_set):
    playlist_ids = playlist_set['id']

    new_feature_set = feature_set[feature_set['id'].isin(
        playlist_ids)].drop_duplicates(subset="id")

    list_temp = list(playlist_set['weeks_passed'])

    new_feature_set['weeks_passed'] = list_temp

    for i in range(1, len(new_feature_set.columns)-2):
        new_feature_set.iloc[:, i] = new_feature_set.iloc[:,
                                                          i]*new_feature_set['weeks_passed']
    new_feature_set_final = new_feature_set.drop(
        ['weeks_passed', 'id'], axis=1)

    return new_feature_set_final.sum(axis=0)


def songs_not_in_playlist_featureset(feature_set, playlist_set):
    playlist_ids = playlist_set['id']
    return feature_set[~feature_set['id'].isin(playlist_ids)]


def recommended_songs(final_df, non_playlist_feature_df, reference_vector, sp):
    non_playlist_df = final_df[final_df['id'].isin(
        non_playlist_feature_df['id'].values)]
    non_playlist_no_id_featureset = non_playlist_feature_df.drop('id', axis=1)
    non_playlist_df['similarity'] = cosine_similarity(
        non_playlist_no_id_featureset.values, reference_vector.values.reshape(1, -1))
    non_playlist_df_top_20 = non_playlist_df.sort_values(
        'similarity', ascending=False).head(20)
    non_playlist_df_top_20['url'] = non_playlist_df_top_20['id'].apply(
        lambda x: sp.track(x)['album']['images'][1]['url'])
    non_playlist_df_top_20 = non_playlist_df_top_20.reset_index(drop=True)
    return non_playlist_df_top_20


def create_recent_df(sp, featureset,final_df):
    playlist_in = pd.DataFrame()
    for num, i in enumerate(sp.current_user_recently_played()['items']):
        playlist_in.loc[num, 'artist'] = i['track']['artists'][0]['name']
        playlist_in.loc[num, 'name'] = i['track']['name']
        playlist_in.loc[num, 'id'] = i['track']['id']  # ['uri'].split(':')[2]
        playlist_in.loc[num, 'url'] = i['track']['album']['images'][1]['url']
        playlist_in.loc[num, 'date_added'] = i['played_at']
    playlist_in['date_added'] = pd.to_datetime(playlist_in['date_added'])

    playlist_in = playlist_in[playlist_in['id'].isin(
        featureset['id'].values)].sort_values('date_added', ascending=False)

    # now we will create a vector for this playlist
    final_vector_playlist = create_vector_for_songs(featureset, playlist_in)

    # now we pass in to check cosine similarity and return the top 10 songs in recommendations
    non_playlist = songs_not_in_playlist_featureset(featureset, playlist_in)

    recommendation = recommended_songs(
        final_df, non_playlist, final_vector_playlist, sp)
    return recommendation


def create_vector_for_songs(feature_set, playlist_set):
    playlist_ids = playlist_set['id']

    new_feature_set = feature_set[feature_set['id'].isin(
        playlist_ids)].drop_duplicates(subset="id")
    new_feature_set = new_feature_set.drop('id', axis=1)
    return new_feature_set.sum(axis=0)
