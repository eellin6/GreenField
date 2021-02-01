import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'

const Top10 = () =>{

   return (


    <div className="marker-list-container">
      <div className="marker-list">

        {

      markers.map((marker) => (
          <div>
            <img className="image" src={marker.image} alt="" />
            <div className="description">{marker.description}</div>
          </div>
      ))
        }
      </div>
    </div>
  );
}

export default Top10;