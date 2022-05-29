import React,{useEffect, useState} from 'react'
import Playlist from './playlist'
import Navbar from './navbar'
import '../css/sidebar.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Link
} from "react-router-dom";
import Player from './player';
function Sidebar() {
  const [playlist,setplaylist]=useState(
  );
  const [access_token, setaccess_token]=useState()

  useEffect(() => {
    fetch('/login').then(res => res.json()).then(data => {
    })
    fetch('/hometoken').then(res=>res.json()).then(data=>{
      setaccess_token(data.token_info['access_token'])
    })
  }, []);
  
  useEffect(()=>{
    fetch(`/getplaylist`).then(res=>res.json().then(data=>{    
       setplaylist(data.playlist); 
      //  console.log(playlist)
    }))
},[])
  return (
    <>
    
    <div className="sidebar">
    <Link to='/' style={{textDecoration:'none'}}><Navbar></Navbar></Link>
    <hr></hr>
    <Playlist playlist={playlist}></Playlist>
    <Routes>
      <Route path='/' exact element={<Player access_token={access_token}/>}/>
      <Route path="/play"  element={<Player/>}/>
      <Route path="/play"  element={<Player/>}/>
      <Route path="/playlistinner/play" exact element={<Player/>}/>
      <Route path="/playlistinner" exact element={<Player/>}/>
    </Routes>
    </div>
    
    
    </>
  )
}

export default Sidebar