import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Map, GoogleApiWrapper, Marker, InfoWindow, useLoadScript } from 'google-maps-react'
import { key } from '../../../config'
import { data } from '../sample_data.js'
import axios from 'axios'
import Favorites from './Favorites'
import { FaRegHeart, FaHeart, FaRegGrinStars, FaGhost } from 'react-icons/fa'
import { RiAliensFill } from 'react-icons/ri'
import CreateMarker from './CreateMarker'

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: data,
      favorites: [],
      isFavorite: false,
      drawMarker: false,
      view: 'map'
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onHeartClick = this.onHeartClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  onHeartClick() {
    console.log('click')
    console.log(this.state.selectedPlace)
    const { position, name, picture } = this.state.selectedPlace
    const { lat, lng } = position
    const data = {latitude: lat, longitude: lng, description: name, imageUrl: picture}
    axios.post('/api/favorites', data)
    .then(data =>
    console.log('favorite added--------->', data))
    .catch(err => console.log(err))
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
changeView(option) {
  this.setState({
    view: option
  })
}
 onInfoWindowOpen(props, e) {
   const fav = (
     <div>
    <h5><img src={this.state.selectedPlace.picture} width={200} height={200}/></h5>
    <h6>{this.state.selectedPlace.name}</h6>
     {this.state.isFavorite ? <FaHeart
          onClick={this.onHeartClick}
    ></FaHeart> : <FaRegHeart onClick={this.onHeartClick} ></FaRegHeart>
     }
    </div>
   );
   ReactDOM.render(React.Children.only(fav), document.getElementById('iwc'))
 }

 render() {
   const style = {
     width: '96vw',
     height: '85vh'
   }
   const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
  const { view } = this.state
  //  console.log(this.state.selectedPlace)
return (
  <div>
  <h2><button
    type="button"
    position="relative"
    style={{backgroundColor: view === 'addMarker' ? 'green' : null}}
    onClick={() => this.changeView('addMarker')}
    >ADD & DRAG </button></h2>
<div className='main'>
  {view === 'map'
  ? <Map
onClick={(e) => console.log(e)}
 google={this.props.google}
 initialCenter={{
  lat: 29.9511,
  lng: -90.081807
}}
 zoom={12}
 style={style}
 containerStyle={containerStyle}
 >

{this.state.markers.map((marker, index) => (
          <Marker
            key={index}
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
          onOpen={e => this.onInfoWindowOpen(this.props, e)}
        >
        <div id='iwc'>

          </div>


        </InfoWindow>
  </Map> : <CreateMarker />
 }
 </div>
 </div>
  )}
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);