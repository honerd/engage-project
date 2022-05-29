import React, { useEffect, useState } from 'react'
import Recommendedsongs from './recommendedsongs';
import { BeatLoader } from 'react-spinners';
function Recommendationengine(props) {
  const [songs, setsongs] = useState();
  const [loading, setloading] = useState(true);

  let id=props.id;
  let type=props.type
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch('/getrecommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': id,
          'type':type
        })
      });
      const data = await res.json();

      setsongs(data);
      setloading(false);

    }

    fetchdata();
  }, [id])

  return (
    <>
      <div className="carousal_title_rec">
        <div className="ct1">For</div>
        <div className="ct2">You</div>
      </div>
      <div className="recommendations">

        {
          songs?.map(songs => {
            return (

              <Recommendedsongs name={songs.name} image={songs.url} id={songs.id} artist={songs.artists_upd}></Recommendedsongs>
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

export default Recommendationengine