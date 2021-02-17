import { IconButton, Toolbar, InputBase, AppBar} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
//import React, {Component} from 'react';
//import SearchBar from 'material-ui-search-bar';

import React, { Component } from 'react';
import SearchBar from './SearchBar';


class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      searchResults: []
    };

    //this.handleSearch = this.handleSearch.bind(this);
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
        <AppBar position="static">



        </AppBar>
        <div>
          <SearchBar
            value={this.state.inputValue}
            onChange={() => this.handleSubmit}
            onRequestSearch={() => this.handleSearch(this.state.inputValue)}
            businessList={searchResults}
          />

        </div>

      </div>


    );
  }
}





export default SearchPage;








