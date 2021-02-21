import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';

class Rating extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { value, onStarClick } = this.props;

    return (
      <div>
        <h4>Rating: {value}</h4>
        <ReactStars
          count={5}
          onChange={onStarClick}
          value={value}
          size={24}
          activeColor="#ffd700"
        />
      </div>
    );
  }
}

export default Rating;
