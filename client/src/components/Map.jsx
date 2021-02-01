import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { key } from '../../../config'


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
    this.handleMapClick = this.handleMapClick.bind(this);
  }
  handleMapClick(ref, map, ev) {
    const location = ev.latLng;
    this.setState(prevState => ({
      locations: [...prevState.locations, location]
    }));
    map.panTo(location);
  };

 render() {
   const style = {
     width: '96vw',
     height: '85vh'
   }
   console.log(key)
return (
<Map
 google={this.props.google}
 initialCenter={{
  lat: 29.9511,
  lng: -90.081807
}}
 zoom={12}
 style={style}
 onClick={this.handleMapClick}
 >
     <Marker
    position={{
      lat: 29.9533,
      lng: -90.0711
    }} />
 </Map>
)
 }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);