import React from 'react'
import CreatedPlaylist from './createdplaylist'
import '../css/playlist.css'
function Playlist(props) {

 
  return (
    <>
        <div className="carousal_title">
          <div className="ct1">Your</div>
          <div className="ct2">Playlists</div>
        </div>
        <div className="playlist">
        {
            props.playlist?.map(data => 
              {
                
                 return(
                  <CreatedPlaylist name={data.name} id={data.id} images={data.images[0].url} songs={data.tracks.total} playlist={data} ></CreatedPlaylist>
                  )
                
              })
          }

        </div>
        </>
  )
}

export default Playlist