import React, { useEffect, useState } from 'react'
import Recommendations from './songsplayed'
import '../css/mainpart.css'
import Playlistinner from './playlistinner'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Recommendationengine from './recomendationengine';
function Mainpart() {



  



  return (
    <div className="mainpart">

      
        <Routes>

          <Route path='/' exact element={<><Recommendations/>
                <Recommendationengine type={'mainpart'}/></>}>
          </Route>
          <Route path='/play' exact element={<><Recommendations/>
                <Recommendationengine type={'mainpart'}/></>}>
          </Route>
          <Route path='/playlistinner' exact element={<Playlistinner />} />
          <Route path='/playlistinner/play' exact element={<Playlistinner />} />
        </Routes>
      
    </div>
  )
}

export default Mainpart