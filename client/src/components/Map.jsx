import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

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
  apiKey: 'AIzaSyB7QH7Uxcis1hOZetk8aqfaQsoRdNwmwcw'
})(MapContainer);