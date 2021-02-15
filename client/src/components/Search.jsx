import { IconButton, Toolbar, InputBase, AppBar} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, {Component} from 'react';
import SearchBar from 'material-ui-search-bar';

//import React, { Component, useStyles } from 'react';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    this.setState({
      inputValue: e.target.value
    });

  }

  handleSearch (inputValue) {
    axios.get('/api/search', {inputValue})
      .then((res) => {

        // this.setState({

        // })
      });
  }

  render () {

    return (
      <div >
        <AppBar position="static">

          <div>
            <SearchBar
              value={this.state.inputValue}
              onChange={(newVal) => this.setState({ inputValue: newVal})}
              onRequestSearch={() => this.handleSearch(this.state.inputValue)}
            />

          </div>

        </AppBar>
      </div>
    );
  }
}



export default Search;


