import React from 'react';
import GoogleApiWrapper from './Map';


class NewCenter extends React.Component{
  constructor(props){
    super(props)
    console.log({props})
    this.state = {
     location: ''
    }
  }
render(){
  return (
    <div>
     <input type='number'  onChange={(e) => this.setState({lat: e.target.value})} placeholder='Place Latitude Here' />
      <input type='number' onChange={(e) => this.setState({lng: e.target.value})} placeholder='Place Longitude Here' />
      <button onClick={this.refreshPage}>Go</button>
    </div>
  )
}


}








export default NewCenter;