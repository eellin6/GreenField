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

  componentDidMount() {

  }

  handleSubmit (e) {
    this.setState({
      inputValue: e.target.value
    });

  }

  handleSearch (inputValue) {
    axios.get('/api/search', {inputValue})
      .then((res) => {
        console.log('LOOK HERE', res);
        // this.setState({

        // })
      });
  }

  render () {

    return (
      <div >
        <AppBar position="static">

          <Toolbar>
            <SearchBar />
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



export default Search;


