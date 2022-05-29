import React, { useState, useEffect } from 'react'
import '../css/recommendedsongs.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { BeatLoader } from 'react-spinners';
function Recommendedsongs(props) {
  
  
  const [access_token, setaccess_token] = useState()
  const [uri, seturi] = useState()
  const [loading, setloading] = useState(true);
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch('/getplaysong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": props.id,
        })
      }
      )

      const data = await res.json()
      setaccess_token(data.access_token)
      seturi(data.trackuri)
      setloading(false)
    }

    fetchdata();
  }, [])


  return (
    <>
    {
      uri?<div className="recommended-song" >
      <Link to='/play' state={{
        uri: uri,
        access_token: access_token
      }} style={{ textDecoration: 'none', height: '100%', width: '98%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <div className="img-song"><img src={props.image} alt="" /></div>
        <div className="song-title">{props.name}</div>
        <div className="artist">{props.artist}</div>
      </Link>
    </div>:<div></div>
    }
    {
          loading?<BeatLoader color={"#2364a4"} />:<div></div>
    }
    </>

  )
}

export default Recommendedsongs