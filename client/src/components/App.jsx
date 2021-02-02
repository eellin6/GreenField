import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'
import login from './Login'
import register from './Register'
import Top10 from './Top10'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seen: false
    }
  }
render() {
  return (
    <div>
<h1>HELLO WORLD</h1>
<div>
  <GoogleApiWrapper />

</div>
    </div>
  )
}
}




export default App;