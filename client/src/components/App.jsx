import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'
import Login from './Login'

import Top10 from './Top10'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seen: false,
      isLoggedIn: false,
      member: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

handleClick(){
this.setState({member: true})
}
render() {

  const status = 'Login'
  if(this.state.isLoggedIn){
    status = 'Logout'
  }
  return (
    <div>
<button onClick={this.handleClick}>Logout</button>
<div>
  <GoogleApiWrapper />

</div>
    </div>
  )
}
}




export default App;