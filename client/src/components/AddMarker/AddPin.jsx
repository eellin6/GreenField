import React, { Component } from 'react'

class AddPin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      latitude: null,
      longitude: null,
      picture: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { lat, lng } = this.props.marker.position
    console.log('MARKER', this.props.marker)
    return(
      <div>
        <form  action='/markers/create' method="POST">
        <input placeholder="Description" onChange={this.handleChange} name='description' />
        <input type="text" readOnly value={lat} onBlur={this.value=this.value=='' ? 'default'
         : this.value} name='latitude'/>
        <input type="text" readOnly value={lng} onBlur={this.value=this.value=='' ? 'default'
         : this.value} name='longitude'/>
         <input type="file" placeholder="insert picture" value='' name='picture'/>
        <button type='submit'>Add Pin</button>
        </form>
      </div>

    )
  }
}


export default AddPin