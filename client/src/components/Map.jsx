import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { key } from '../../../config'


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      markers: [
        {
          name: "Current position",
          position: {
            lat: 29.9533,
            lng:-90.0711
          }
        }
      ]


    }
  }
   onMarkerDragEnd (coord, index) {
     const { latLng } = coord;
     const lat = latLng.lat();
     const lng = latLng.lng();

     this.setState(prevState => {
       const markers = [...this.state.markers];
       markers[index] = { ...markers[index], position: { lat, lng } };
       return { markers };
     });
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

{this.state.markers.map((marker, index) => (
          <Marker
            position={marker.position,
              console.log(marker.position)
            }
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.name}

          />
        ))}
 </Map>
)
 }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);