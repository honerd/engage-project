import React, { useEffect, useState } from 'react'
import '../css/playlistinner.css'
import Playlistinnerslides from './playlistinnerslides'
import {
  useLocation,
} from "react-router-dom";
import Recommendationengine from './recomendationengine';
import { BeatLoader } from 'react-spinners';
function Playlistinner(props) {

  const [playlist_info, setplaylist_info]=useState();
  const [loading, setloading] = useState(true);
  let id,name,url,songs;
  const location=useLocation();
  id=location.state.id;
  name=location.state.name;
  songs=location.state.songs;
  url=location.state.url;
  // const [playlist_details, setplaylistdetails]=useState({
  //   id:id,
  //   name:name,
  //   url:url,
  //   songs:songs
  // })
  
  
  useEffect(()=>
  {

    setplaylist_info(undefined)
    async function fetchdata()
    {
      
      const res=await fetch('/getplaylistsongs',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name':name,
          'id':id
        })
      });
      const data=await res.json();
      console.log(id)
      
      
      setplaylist_info(data.tracks.items)
      setloading(false)
      
      
    }
    fetchdata();
  },[id])

  

  
  
  return (
    <>
      <div className="playlist_details">
      <div className="playlist_img"><img src={url} alt="" /></div>
      <div className="playlist_title">
          <div className="pt1">{name}</div>
          
          
      </div>
      
      <div className="song_count">
          <div className="sc1">No of songs :</div>
          <div className="sc2">{songs}</div>
      </div>
      </div>
      <div className="playlist_desc">
        <div className="playlist_attr">
        <div className="no">No</div>
        <div className="name">Name</div>
        <div className="song_artist">Artists</div>
        <div className="duration">Duration</div>
        
        </div>
        {console.log(playlist_info)}
            {playlist_info?.map((playlist,index)=>{
            return(
              <Playlistinnerslides name={playlist.track.name} id={playlist.track.id} sno={index+1} artist={playlist.track.artists[0].name} duration={playlist.track.duration_ms} playlist_id={id} playlist_name={name} playlist_url={url} playlist_songs={songs}></Playlistinnerslides>
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