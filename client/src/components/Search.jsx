import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';
import SearchBar from './SearchBar';
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      searchResults: []
    };

    // this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render () {
    const { inputValue, searchResults } = this.state;
    return (
      <div >
        <AppBar position="static"/>
        <div>
          <SearchBar
            value={this.state.inputValue}
            onChange={() => this.handleSubmit}
            onRequestSearch={() => this.handleSearch(inputValue)}
            businessList={searchResults}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
