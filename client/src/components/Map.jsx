import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import { key } from '../../../config'
import { data } from '../sample_data.js'


class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: data


    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  }
  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
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

   onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
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

{this.state.markers.map((marker, index) => (
          <Marker
            position={{lat: marker.latitude,
                     lng: marker.longitude
            }}
            draggable={true}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
            name={marker.description}
            onClick={this.onMarkerClick}
            picture={marker.imageUrl}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h5><img src={this.state.selectedPlace.picture} width={200} height={200}/></h5>
            <h6>{this.state.selectedPlace.name}</h6>
          </div>
        </InfoWindow>
 </Map>
)
 }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);