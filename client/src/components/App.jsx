import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'
import Top10 from './Top10';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
render() {
  return (
<div>
<div><GoogleApiWrapper /></div>

<div><Top10/></div>
</div>

  )
}
}




export default App;