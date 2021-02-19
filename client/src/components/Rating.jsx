import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1
    };

    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(nextVal, prevVal, name) {
    this.setState({
      rating: nextVal
    });
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h3>Rating: {rating}</h3>
        <ReactStars
          count={5}
          onChange={this.onStarClick}
          value={rating}
          size={24}
          activeColor="#ffd700"
        />


      </div>
    );
  }
}

export default Rating;
