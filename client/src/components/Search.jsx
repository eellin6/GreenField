import { IconButton, Toolbar, InputBase, AppBar} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
//import React, {Component} from 'react';
//import SearchBar from 'material-ui-search-bar';

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import BusinessList from './BusinessList';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [busListDefault, setBusListDefault] = useState();
  const [businessList, setBusinessList] = useState();

  const getBusinesses = (input) => {
    axios.get('/api/search', {input})
      .then(data => {
        setBusinessList(data);
        setBusListDefault(data);
      });
  };

  useEffect( () => { getBusinesses(); }, []);

  return (
    <>
      <h1>List of Businesses</h1>
      <SearchBar
        input={input}

      />

    </>
  );
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



