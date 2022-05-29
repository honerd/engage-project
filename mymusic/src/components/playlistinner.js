import React, { useEffect, useState } from 'react'
import '../css/playlistinner.css'
import Playlistinnerslides from './playlistinnerslides'
import {
  useLocation,
} from "react-router-dom";
import Recommendationengine from './recomendationengine';
import { BeatLoader } from 'react-spinners';
function Playlistinner() {

  const [playlist_info, setplaylist_info]=useState();
  const [loading, setloading] = useState(true);

  const location=useLocation();
  const {id,name,url,playlist,songs}=location.state;
  const [playlistid, setplaylistid]=useState(id)
  const [playlistname, setplaylistname]=useState(name)
  const [playlisturl, setplaylisturl]=useState(url)
  const [playlistsongs,setplaylistsongs]=useState(songs)
  useEffect(()=>
  {
    async function fetchdata()
    {
      const res=await fetch('/getplaylistsongs',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name':playlistname,
          'id':playlistid
        })
      });
      const data=await res.json();

      setplaylist_info(data.tracks.items)
      setloading(false)
    }

    fetchdata();
  },[id])

  
  
  return (
    <>
      <div className="playlist_details">
      <div className="playlist_img"><img src={playlisturl} alt="" /></div>
      <div className="playlist_title">
          <div className="pt1">{playlistname}</div>
          
      </div>
      
      <div className="song_count">
          <div className="sc1">No of songs :</div>
          <div className="sc2">{playlistsongs}</div>
      </div>
      </div>
      <div className="playlist_desc">
        <div className="playlist_attr">
        <div className="no">No</div>
        <div className="name">Name</div>
        <div className="song_artist">Artists</div>
        <div className="duration">Duration</div>
        {console.log(playlist_info)}
        </div>
          {playlist_info?.map((playlist,index)=>{
            return(
              <Playlistinnerslides name={playlist.track.name} id={playlist.track.id} sno={index+1} artist={playlist.track.artists[0].name} duration={playlist.track.duration_ms} ></Playlistinnerslides>
            )
          })}
          {
            loading?<BeatLoader color={"#2364a4"} />:<div></div>
          }

          <Recommendationengine id={id} type={'playlistinner'}/>
      </div>
      </>
  )
}

export default Playlistinner