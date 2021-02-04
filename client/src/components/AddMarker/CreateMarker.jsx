import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow, useLoadScript } from 'google-maps-react'
import { key } from '../../../../config'
import Modal from './Modal'

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
      isOpen: false
    }
    this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);

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

  <h3><button type="button" onClick={this.handleOpenModal}>Add Pin</button></h3>
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
<Modal isOpen={this.state.isOpen} handleClose={this.handleCloseModal}>
          <p>Add Pin</p>
        </Modal>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: key
})(CreateMarker);