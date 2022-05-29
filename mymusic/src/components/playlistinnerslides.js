import React,{ useState, useEffect} from 'react'
import '../css/playlistinnerslides.css'
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Link,
  } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
function Playlistinnerslides(props) {
  const [access_token, setaccess_token] = useState()
  const [uri, seturi] = useState()
  const [loading,setloading]=useState(true)

  useEffect(() => {

    seturi(undefined);
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

  function timeconverter(time)
  {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds= Math.floor((time/1000)%60);

    return (minutes+":"+seconds)
  }

    var time =timeconverter(props.duration)
    
    
  return (
    <>
    {
      console.log(props.id,uri)
    }
        {
          uri?<Link to='/playlistinner/play' state={{
            uri: uri,
            access_token: access_token,
            id:props.playlist_id,
            name:props.playlist_name,
            url:props.playlist_url,
            songs:props.playlist_songs
          }} className='linker'>
            <div className="song_no">{props.sno}</div>
            <div className="song_name">{props.name}</div>
            <div className="artists">{props.artist}</div>
            <div className="song_duration">{time}</div>
            </Link>:<div></div>
        }
        {
          loading?<BeatLoader color={"#2364a4"} />:<div></div>
        }
      </>
  )
}

export default Playlistinnerslides