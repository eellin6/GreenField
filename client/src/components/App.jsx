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
axios.get('/login')
.then(data => console.log('Success'))
.catch(err => console.log('Error', err))
}
render() {

  const status = 'Login'
  if(this.state.isLoggedIn){
    status = 'Logout'
  }
  return (
    <div>
<button onClick={this.handleClick}>{status}</button>
<div>

  <GoogleApiWrapper />

</div>
    </div>
  )
}
}




export default App;