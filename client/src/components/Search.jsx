import { IconButton, Toolbar, InputBase, AppBar} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
//import React, {Component} from 'react';
//import SearchBar from 'material-ui-search-bar';

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const SearchPage = (props) => {

};

export default SearchPage;




// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: '',
//       results: ['does this work']
//     };

//     this.handleSearch = this.handleSearch.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit (e) {
//     this.setState({
//       inputValue: e.target.value
//     });

//   }

//   handleSearch (inputValue) {
//     axios.get('/api/search', {inputValue})
//       .then(({data}) => {
//         console.log('look HEREEEEEEEEEEEEEEE', data);
//         //const {}
//         this.setState({
//           inputValue: data.businesses
//         });
//       }).catch((err) => console.error(err));
//   }

//   render () {
//     const { inputValue } = this.state;
//     return (
//       <div >
//         <AppBar position="static">

//           <div>
//             <SearchBar
//               value={this.state.inputValue}
//               onChange={() => this.handleSubmit}
//               onRequestSearch={() => this.handleSearch(this.state.inputValue)}
//             />

//           </div>

//         </AppBar>
//         <div>
//           <ul>
//             {this.data}
//           </ul>

//         </div>
//       </div>


//     );
//   }
// }



