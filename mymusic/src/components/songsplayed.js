import React, { useState, useEffect } from 'react'
import RecommendedSongs from './recommendedsongs';
import '../css/recommendations.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { BeatLoader } from 'react-spinners';
function Recommendations() {

  const [songs, setsongs] = useState();
  const [loading, setloading] = useState(true);

  return (
    <>
      <div className="carousal_title_rec">
        <div className="ct1">Recently</div>
        <div className="ct2">Played</div>
      </div>
      <div className="recommendations">
        {
          useEffect(()=>
          {
            async function getsongs()
            {
              let res= await fetch('/gettracks');
              let data= await res.json();
              setsongs(data.details);
              setloading(false)
            }

            getsongs();
          },[])}

        {
          songs?.map(songs=>
            {
               
              return(
                songs.track.album.images?<RecommendedSongs name={songs.track.name} image={songs.track.album.images[0].url} id={songs.track.id} artist={songs.track.artists[0].name}></RecommendedSongs>:<RecommendedSongs name={songs.track.name} image="https://i.scdn.co/image/ab67616d00001e02b19f9dd623760e9b1105b8a5" id={songs.track.id} artist={songs.track.artists[0].name}></RecommendedSongs>
              )
              
            })

        }
        {
          loading?<BeatLoader color={"#2364a4"} />:<div></div>
        }

        
        
      
 
      </div>
    </>
  )
}

export default Recommendations