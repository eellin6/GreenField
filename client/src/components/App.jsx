import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
render() {
  return (
<div>
  <GoogleApiWrapper />
</div>
  )
}
}




export default App;