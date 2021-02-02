import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import MapContainer from './Map'
import axios from 'axios'
<<<<<<< HEAD
import Top10 from './Top10';
=======
import Login from './Login'
>>>>>>> cf18585504b6bbd045a2bdcd374fac5e52007fab

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
<button onClick={this.handleClick}>{status}</button>
<div>
<<<<<<< HEAD
<div><GoogleApiWrapper /></div>

<div><Top10/></div>
</div>

=======
{status === 'Login' ? <Login /> :
  <GoogleApiWrapper />}

</div>
    </div>
>>>>>>> cf18585504b6bbd045a2bdcd374fac5e52007fab
  )
}
}




export default App;