import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow, useLoadScript } from 'google-maps-react'
import { key } from '../../../config'

class CreateMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: [
        {
          name: "Current Position",
          position: {
            lat: 29.9533,
            lng: -90.0711
          }
        }
      ]
    }
    this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this);
  }

  onMarkerDragEnd (coord, index) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const marker = [...this.state.marker];
      marker[index] = { ...marker[index], position: { lat, lng } };
      return { marker };
    });
  };


  render() {
    const { marker } = this.state
    const style = {
      width: '96vw',
      height: '85vh'
    }
    const containerStyle = {
     position: 'relative',
     width: '100%',
     height: '100%'
   }
    return(
      <Map
onClick={(e) => console.log(e)}
 google={this.props.google}
 initialCenter={{
  lat: 29.9511,
  lng: -90.081807
}}
 zoom={12}
 style={style}
 containerStyle={containerStyle}
 ><Marker
 key={index}
 position={marker.position}
 name={marker.name}
 draggable={true}
 onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
/>

</Map>




    )
  }
}

export default GoogleApiWrapper({
  apiKey: key
})(CreateMarker);