import React, { Component } from 'react';
import axios from 'axios';
import Rating from '../Rating';
class Modal extends Component {
  constructor(props) {

    super(props);
    console.log('PROPS', props);
    this.state = {
      description: '',
      picture: null,
      rating: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.uploadFormWithData = this.uploadFormWithData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleFileChange(event) {
    this.setState({picture: event.target.files[0]});
  }


  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleRatingChange(event, newVal) {
    console.log('LOOK HERE', rating);
    this.setState({
      rating: newVal
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.uploadFormWithData();
  }


  submitForm(data) {
    //console.log('line 37, ', data);
    axios.post('http://localhost:8080/markers/create', data)
      .then(this.props.handleCloseModal())
      .then(this.props.changeView('map'))
      .catch(err => console.log('Error', err));
  }


  uploadFormWithData() {
    const formData = new FormData();
    const { description, picture, rating } = this.state;
    formData.append('description', description);
    formData.append('picture', picture);
    formData.append('rating', this.props.rating);
    formData.append('latitude', this.props.marker.position.lat);
    formData.append('longitude', this.props.marker.position.lng);
    console.log(formData, 'line 42');
    this.submitForm(formData);
  }


  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';

    const { rating } = this.state;

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <form>
            <label className="instructions">Add Description
              <input placeholder="Description" onChange={this.handleChange} name='description' />
            </label>
            <label className="instructions">Add Picture
              <input type="file" placeholder="insert picture" name='picture' id="imagepath" onChange={this.handleFileChange}/>
            </label>
            <label className="instructions">Add Rating
              <Rating

              />
            </label>
            <div>
              <span><button className="modal-btn" type='submit' onClick={this.handleClick}>Add Pin</button></span>
            </div>
          </form>

        </section>
      </div>
    );
  }
}
export default Modal;