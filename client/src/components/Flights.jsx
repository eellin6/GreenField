import React, {useState, useEffect } from 'react';
import axios from 'axios';

const getFlights = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    axios.get('/flights')
      .then(({data}) => setPosts(data))
      .catch((err) => console.warn(err));
  });

  return (
    <div>
      {
        posts.map((post, i) => {
          const time = new Date(+0);
          //adding seconds to 1970
          time.setSeconds(time.getSeconds() + post.estimatedarrivaltime);
          //logging the updated time
          // console.info(String(time));
          return (
          //throw key to stop error
            <div key={ String(i) }>
              <div>Destination: { post.destinationName }</div>
              <div>Landing Time: { String(time) }</div>
              <div>Flight Number: { post.ident }</div>
              <button>Save Flight</button>
              <br></br>
            </div>
          );
        })
      }
    </div>
  );
};

export default getFlights;
