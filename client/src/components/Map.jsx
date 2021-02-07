import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import { key } from '../../../config'
import axios from 'axios'

import { FaRegHeart, FaHeart } from 'react-icons/fa'



class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      favorites: [],
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isFavorite: false,
      drawMarker: false,
      comments: null,
      view: 'map',
      newArea: false,
      reload: false

    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onHeartClick = this.onHeartClick.bind(this);
    this.markerFetcher = this.markerFetcher.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.commentFetcher = this.commentFetcher.bind(this);

  }

  markerFetcher() {
    axios.get('/markers')
    .then((marker) =>{

      this.setState({
        markers: marker.data,

      });

    } )
    .catch((err) => {

    });
  }
  commentFetcher() {

    axios.get('/comments')
    .then((comment) =>{
      console.log('this is comments axios get req', comment.data)

      this.setState({
         comments: comment.data
       })





    } )
    .catch((err) => {

    });
  }
  componentDidMount(){
    this.markerFetcher();
    this.commentFetcher();


  }


  handleChange(event){

    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }
  handleSubmit(){
    const {comments} = this.state


    const data =
     { description: this.state.selectedPlace.name,
      comments: comments

    }
    axios.post('/comments', data)
    .then(data => console.log('User Registered'))

    .catch((err) => console.log('AXIOS POST ERROR', err))

  }



  onHeartClick() {
    console.log(this.state.selectedPlace)
    console.log('this.state.comments', this.state.comments)

    const { position, name, picture } = this.state.selectedPlace
    const { lat, lng } = position
    const data = {latitude: lat, longitude: lng, description: name, imageUrl: picture}
    axios.post('/api/favorites', data)
    .then(data => console.log('success'))
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
     <a href={this.state.selectedPlace.picture}>ENLARGE PHOTO</a>
      <form  action="/comments" method='POST'   >
      <input type="text" readOnly value={this.state.selectedPlace.name} onBlur={this.value=this.value=='' ? 'default'
         : this.value} name='description'/>

      <label>Comment</label>
      <input type='text'  id='comments' name='comments'   />
    <button  type="submit">Post</button>
    </form>
{this.state.comments.map((data, index) => {
  if(data.description === this.state.selectedPlace.name){
  return <div key={index}>{data.comments}</div>
  }
})}

    </div>
   );
   ReactDOM.render(React.Children.only(fav), document.getElementById('iwc'))
 }

 render() {

   const style = {
    justifyContent: 'center',
    alignItems: 'center',
     width: '67vw',
     height: '55vh'
   }
   const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
  const { view } = this.state
  const location = this.props.location
return (
  <div>
<div className='main'>
<Map
onClick={(e) => console.log(e)}
 google={this.props.google}
 initialCenter={{
  lat: 29.95,
  lng: -90.07
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
            comments={[]}
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
  </Map>
 </div>
 </div>
  )}
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);