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

<<<<<<< HEAD
handleClick(){
axios.get('/login')
.then(data => console.log('Success'))
.catch(err => console.log('Error', err))
=======

changeView(option) {
  this.setState({
    view: option
  });
>>>>>>> 776658171dbb87b9c893a98bb796d3e394cef989
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
  const { view } = this.state;


  return (
    <div>
<<<<<<< HEAD
<button onClick={this.handleClick}>{status}</button>
<div>

  <GoogleApiWrapper />
=======
        <div className='nav'>
          <span className='logo'
            onClick={() => this.changeView('map')}>
            Geonovo
          </span>

          <span
            className={
              view === 'map'
                ? 'nav-selected'
                : 'nav-unselected'
            }
            onClick={() => this.changeView('map')}
          >
            Map
          </span>


          <span className='nav-unselected' onClick={() => this.changeView('login')}>
            Login
          </span>
          <span className='nav-unselected' onClick={() => this.changeView('register')}>
            Register
          </span>

        </div>
        <div className='main'>
          {this.renderView()}
        </div>
      </div>
>>>>>>> 776658171dbb87b9c893a98bb796d3e394cef989

  )
}
}




export default App;