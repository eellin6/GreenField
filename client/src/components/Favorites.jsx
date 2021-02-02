import React, { Component } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

class Favorites extends Component {
  constructor({ markers }) {
    super({ markers })
    this.state = {
      favorites: [],
      isFavorite: false
    }
    this.addFav = this.addFav.bind(this);
  }
  addFav(marker) {
    this.setState({isFavorite: !this.state.isFavorite});
    let arr = this.state.favorites;
    arr.map((item, key) => {
        if (item === marker) {
          arr.splice(key, 1);
        }
      if (this.state.isFavorite) {
        arr.push(marker)
      }
    })
    this.setState({favorites: arr})
  }
  render() {
    const { favorites } = this.state;
    return(
      <div>
        {favorites.includes(marker) ? (
          <FaHeart
              onClick={() => this.addFav({ items, marker })}
              style={{ color: 'red' }}
          />
        ) : (
          <FaRegHeart
              onClick={() => this.addFav({ items, marker})}
              style={{ color: 'red' }}
          />
        )}
      </div>
    )
  }
}



export default Favorites;
