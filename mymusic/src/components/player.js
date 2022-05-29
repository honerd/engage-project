import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-web-playback'
import '../css/player.css'

let uri_new=undefined;
function Player(props) {


    const location=useLocation();
    console.log(location)
      
     let uri;
     let access_token;
     if(location.state)
     {
       uri=location.state['uri']
       access_token=location.state['access_token']
     }   
     
    
    const [play, setplay]=useState(false)
    useEffect(()=>{
      uri_new=(uri==undefined)?uri_new:uri;
      uri_new?setplay(true):setplay('false')
    },[uri]
    )
    console.log(play)
    
  return (
    
    <>
    {
        <div className="player">
        <SpotifyPlayer
        token={access_token?access_token:props.access_token}
        callback={state=>{
          if(state.isPlaying)
          {
            setplay(true)
          }
        }}
        autoPlay={true}
        showSaveIcon
        play={play}
        uris={uri? [uri]:[]}
        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#2364a4',
            sliderColor: '#2364a4',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}></SpotifyPlayer>
    </div>
    }
    </>
   
  )
}

export default Player