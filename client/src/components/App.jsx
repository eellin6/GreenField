import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'
import Login from './Login'
import Register from './Register'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seen: false,
      isLoggedIn: false,
      member: false,
      view: 'map'
    }
    this.changeView = this.changeView.bind(this)
  }


changeView(option) {
  this.setState({
    view: option
  });
}
renderView() {

  const { view } = this.state;
  // This will render different views when navigation is clicked
  if (view === 'map') {
    return <GoogleApiWrapper  handleClick={() => this.changeView('anypostview')}/>;
  } else if (view === 'login') {
    return <Login handleClick={() => this.changeView('anypostview')}/>;
  } else if (view === 'register') {
    return <Register handleClick={() => this.changeView('anypostview')}/>;
  }
}

render() {
  const { view, isLoggedIn  } = this.state;
  //if the status of a user is not logged in, display a login button
  const status = 'Login'
if(isLoggedIn){
  //if the status of a user is logged in, display logout button
  status = 'Logout'
}
  return (
    <div style={{color: 'black'}}>
      <header>

      <h1 style={{
        alignSelf: 'normal',
        color: 'blue'
        }}>Welcome To Geo-Nov</h1>
      </header>

        <div className='nav'>
          <button className='logo'
            onClick={() => this.changeView('map')}>
            Home
          </button>

          {/* <button
            className={
              view === 'map'
                ? 'nav-selected'
                : 'nav-unselected'
            }
            onClick={() => this.changeView('map')}
          >
            Map
          </button> */}


          <button className='nav-unselected' onClick={() => this.changeView('login')}>
            {status}
          </button>
          <button className='nav-unselected' onClick={() => this.changeView('register')}>
            Register
          </button>

        </div>
        <div className='main'>
          {this.renderView()}
        </div>
      </div>

  )
}
}




export default App;