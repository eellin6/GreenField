/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { GOOGLEMAPS_TOKEN, directions } from '../../../config';
import axios from 'axios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Rating from './Rating';
class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      markersByUser: [],
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
      reload: false,
      markerId: 0,
      rating: 1
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onHeartClick = this.onHeartClick.bind(this);
    this.markerFetcher = this.markerFetcher.bind(this);
    this.fetchUserMarkers = this.fetchUserMarkers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.commentFetcher = this.commentFetcher.bind(this);
  }

  markerFetcher() {
    axios.get('/markers')
      .then(({ data }) => this.setState({ markers: data }))
      .catch((err) => console.warn(err));
  }

  fetchUserMarkers() {
    axios.get('/users/find')
      .then(({ data }) => this.setState({ id: data }))
      .then(() => {
        const { id } = this.state;
        return axios.get(`/markers/${id}`, { id })
          .then(({ data }) => this.setState({ markers: data }))
          .catch((err) => console.warn(err));
      })
      .catch((err) => console.warn(err));
  }

  commentFetcher() {
    axios.get('/comments')
      .then(({ data }) => this.setState({ comments: data }))
      .catch((err) => console.warn(err));
  }

  componentDidMount() {
    this.fetchUserMarkers();
    this.commentFetcher();
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit() {
    const {comments, rating} = this.state;
    const data =
     { description: this.state.selectedPlace.name,
       comments: comments,
       rating: rating
     };
    axios.post('/comments', data)
      .then(data => console.log('User Registered', data))
      .catch((err) => console.log('AXIOS POST ERROR', err));
  }

  onHeartClick() {
    const { position, name, picture, rating } = this.state.selectedPlace;
    const { lat, lng } = position;
    const data = {latitude: lat, longitude: lng, description: name, imageUrl: picture, rating: rating};
    this.setState({isFavorite: !this.state.isFavorite});
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
  }

  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }

  changeView(option) {
    this.setState({ view: option });
  }

  onInfoWindowOpen(props, e) {
    const { markers, rating } = this.state;
    const fav = (
      <div>
        <div className="marker-img-container">
          <a href={this.state.selectedPlace.picture} target="_blank" >
            <img className="marker-img" src={this.state.selectedPlace.picture}/>
          </a>
        </div>
        <div>
          {this.state.isFavorite
            ? <FaHeart
              onClick={this.onHeartClick}
              style={{ color: 'red', float: 'left', padding: '0 5px 0 0' }}></FaHeart>
            : <FaRegHeart
              onClick={this.onHeartClick}
              style={{ color: 'red', float: 'left', padding: '0 5px 0 0' }}></FaRegHeart>
          }
          <h4> {this.state.selectedPlace.name}</h4>
          <h5><i>Click photo to enlarge</i></h5>
        </div>
        <form action="/comments" method='POST' >
          <input type="text" readOnly value={this.state.selectedPlace.name}
            onBlur={this.value = this.value == '' ? 'default' : this.value}
            name='description'/>
          <div>  <Rating
            value={this.state.selectedPlace.rating}
          /></div>
          <label style={{ padding: '5px 0 0 0' }}>Add Comment
            <input type='text' id='comments' name='comments' />
          </label>
          <button className="modal-btn" type="submit">Post</button>
        </form>
        <div>
          <h1>Comments Section</h1>
        </div>
        {this.state.comments.map((data, index) => {
          if (data.description === this.state.selectedPlace.name) {
            return (
              <div>
                <hr className='rounded'></hr>
                <div key={index}>{data.comments}</div>
              </div>
            );
          }
        })}
      </div>
    );
    ReactDOM.render(React.Children.only(fav), document.getElementById('iwc'));
  }

  render() {
    const mapStyles = [
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers':
          [
            { 'visibility': 'on' },
            { 'color': '#E0EFEF' }
          ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry.fill',
        'stylers':
          [
            { 'visibility': 'on' },
            { 'hue': '#1900FF' },
            { 'color': '#C0E8E8' }
          ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers':
          [
            { 'lightness': 100 },
            { 'visibility': 'simplified' }
          ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers':
          [
            { 'visibility': 'off' }
          ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers':
          [
            { 'visibility': 'on' },
            { 'lightness': 700 }
          ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers':
          [
            { 'color': '#7DCDCD' }
          ]
      }
    ];

    const style = {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '75vh'
    };

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    const { view, rating } = this.state;
    const location = this.props.location;

    return (
      <div>
        <div className="instructions-drag">
          <span onClick={() => this.fetchUserMarkers()} >Your Pins</span>
          <span onClick={() => this.markerFetcher()}>| Friends Pins</span>
        </div>
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
            styles={mapStyles}
            zoomControl={true}
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
                rating={marker.rating}
                comments={[]}
              >

              </Marker>
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onInfoWindowClose}
              onOpen={e => this.onInfoWindowOpen(this.props, e)}
            >

              <div id='iwc'>
              </div>
              <div>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    )
    ;
  }
}
export default GoogleApiWrapper({
  apiKey: GOOGLEMAPS_TOKEN
})(MapContainer);
