import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import axios from 'axios'
import CreateMarker from '../components/AddMarker/CreateMarker'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seen: false,
      isLoggedIn: false,
      view: 'map',
      lat: 29.9,
      lng: -91.6
    }
    this.changeView = this.changeView.bind(this)
    this.handleLogout = this.handleLogout.bind(this);
  }
handleLogout() {
  axios.get('/logout')
  .then(console.log("You successfully logged out"))
  .catch(err => console.error('error logging out', err))
}
changeView(option) {
  this.setState({
    view: option
  });
}
renderView() {
  const { view, lat, lng } = this.state;
  // This will render different views when navigation is clicked
  if (view === 'map') {
    return <GoogleApiWrapper handleClick={() => this.changeView('anypostview')}/>;
  } else if (view === 'addMarker') {
    return <CreateMarker changeView={this.changeView} handleClick={() => this.changeView('anypostview')}/>;
  }
}
render() {
  const { view, isLoggedIn  } = this.state;
  //if the status of a user is not logged in, display a login button
  const status = 'Login'
// if(isLoggedIn){
//   //if the status of a user is logged in, display logout button
//   status = 'Logout'
// }
  return (
    <div style={{color: 'black'}}>
      <header>
      <h1 className="logo"
        >Welcome To Nola Bound</h1>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
      </header>
        <div className='nav'>
          <button className='btn'
            onClick={() => this.changeView('map')}>
            Home
          </button>
          <button
    className="btn"
    type="button"
    position="relative"
    onClick={() => this.changeView('addMarker')}
    >Add a Pin </button>
<button className="btn" href="#" onClick={function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }}>Sign out</button>
        </div>
          {this.renderView()}
      </div>
  )
}
}
export default App;