import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { key } from '../../../config'


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {}
    }
  }
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
 >
 </Map>
)
 }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);