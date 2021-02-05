import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow, useLoadScript } from 'google-maps-react'
import { key } from '../../../../config'
import Modal from './Modal'
import axios from 'axios'
import AddPin from './AddPin'

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
          },
        }
      ],
      view: 'map'
    }
    this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleAddMarker = this.handleAddMarker.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);

  }

  handleAddMarker() {
data[position] = position;
    axios.post('/markers/create', data )
    .then((data) => {console.log('data sent to server')})
    .then(() => {this.setState({view: 'map'})})
    .catch((err) => {console.log(err)})
  }

  handleOpenModal(){
   this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  onMarkerDragEnd (coord, index) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const marker = [...this.state.marker];
      marker[0] = { ...marker[0], position: { lat, lng } };
      return { marker };
    });
  };
handleChangeView() {
  this.setState({view: 'addPin'})
}

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
<div>

  <h3><button type="button" onClick={this.handleChangeView}>Add Pin</button></h3>
  {this.state.view === 'map' ?
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
 position={marker.position}
 name={marker.name}
 draggable={true}
 onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
/>

</Map>
: <AddPin marker={this.state.marker[0]}/>
  }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: key
})(CreateMarker);