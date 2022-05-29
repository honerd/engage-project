import React from 'react'
import '../css/playlistcreated.css'
import {
  Link,
} from "react-router-dom";


function Createdplaylist(props) {
  
  var playlist_var=props.playlist;
  
  return (
    
    <div className="created_playlist" >
        
        
        <Link to={'/playlistinner'} state={{
            id: props.id,
            name: props.name,
            url: props.images,
            playlist: playlist_var,
            songs: props.songs
          }} 
          style={{textDecoration:'none'}}><div className="playlist-title">{props.name}</div></Link>
        
    </div>
  )
}

export default Createdplaylist