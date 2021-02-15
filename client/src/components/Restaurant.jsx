import React, {useState, useEffect } from 'react';
import axios from 'axios';

const getFood = () => {
  const [ post, setPosts ] = useState([]);

  useEffect(() => {
    axios.get('/restaurant')
      .then(({ data }) => setPosts(data))
      .catch((err) => console.warn(err));
  });

  return (
    <div>
      {
        post.map((posts, i) => {
          if (!posts[0].restaurant_phone || posts[0].restaurant_phone === '') {
            return (
              <div key={ String(i) }>
                <div>Name: { posts[0].restaurant_name }</div>
                <div>Phone: N/A </div>
                <div>Address: { posts[0].address.formatted}</div>
                <br></br>
              </div>
            );
          }
          return (
          //throw key to stop error
            <div key={ String(i) }>
              <div>Name: { posts[0].restaurant_name }</div>
              <div>Phone: { posts[0].restaurant_phone }</div>
              <div>Address: { posts[0].address.formatted}</div>
              <br></br>
            </div>
          );
        })
      }
    </div>
  );

};



export default getFood;