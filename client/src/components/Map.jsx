import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-map-react'

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 render() {
   const style = {
     width: '96vw',
     height: '85vh'
   }
return (
<MapContainer
 zoom={8}
 style={style}
 ></MapContainer>
)
 }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB7QH7Uxcis1hOZetk8aqfaQsoRdNwmwcw'
})(MapContainer);