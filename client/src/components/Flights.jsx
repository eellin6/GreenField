import React, {useState, useEffect } from 'react';
import axios from 'axios';

const getFlights = () => {
  const [ posts, setPosts ] = useState([]);
  const [ saveFlight, setSavedFlight ] = useState(false);

  useEffect(() => {
    // axios.get('/flights')
    //   .then(({data}) => setPosts(data))
    //   .catch((err) => console.warn(err));
  });


  return (
    <div>
      {/* {
        posts.map((post, i) => {
          return (
          //throw key to stop error
            <div key={ String(i) }>
              <div>Date: { post.flight_date }</div>
              <div>Status: { post.flight_status }</div>
              <div>Destination: { post.arrival.airport }</div>
              <div>Landing Time: { post.arrival.scheduled }</div>
              <div>Flight Number: { post.flight.number }</div>
              <br></br>
            </div>
          );
        })
      } */}
      <div className="flights">
        <div>Date: 2021-02-21</div>
        <div>Status: landed</div>
        <div>Destination: Dallas/Fort Worth International</div>
        <div>Landing Time: 2021-02-21T11:05:00+00:00</div>
        <div>Flight Number: 3446</div>
      </div>
      {

        saveFlight ? <button onClick={(e) => {
          e.preventDefault();
          setSavedFlight(false);
        }}>My Saved Flight</button> : <button onClick={(e) => {
          e.preventDefault();
          setSavedFlight(true);
          useEffect();

        }}>Save Flight Info</button>
      }
      <div>
        <img className="gif" src={'https://i.pinimg.com/originals/3f/00/4f/3f004fbd0825ffbd4b9b11656a38f451.gif'} />
      </div>
      <div className="flightLogos">
        <div>
          <tr>
            <td><a href="https://www.southwest.com/">
              <img src="https://www.underconsideration.com/brandnew/archives/southwest_airlines_logo.jpg" alt="Southwest"/>
            </a></td>
          </tr>
        </div>
        <div>
          <tr>
            <td><a href="https://www.delta.com/">
              <img src="https://treknova.com/travel-advice/wp-content/uploads/2020/03/Delta-Airlines.jpg" alt="Southwest"/>
            </a></td>
          </tr>
        </div>
      </div>
      {/* <tr>
        <td><a href={'https://www.southwest.com/'}>United Airlines</a></td>
      </tr>
      <tr>
        <td><a href={'https://www.southwest.com/'}>Spirit Airlines</a></td>
      </tr>
      <tr>
        <td><a href={'https://www.southwest.com/'}>Delta Airlines</a></td>
      </tr> */}
      <br></br>
    </div>
  );
};

export default getFlights;
