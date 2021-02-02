import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'
import  data  from '../sample_data.js'

const Top10 = () =>{
console.log(data);
   return (
    !data ? null :


    <div className="marker-list-container">
      <div className="marker-list">

        {

      data.map((marker) => (
          <div>
            <img className="image" src={marker.imageUrl} alt="" />
            <div className="description">{marker.description}</div>
          </div>
      ))
        }
      </div>
    </div>
  );
}

export default Top10;