import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, {useState, useEffect } from 'react';

// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: '',
//     };
//   }

//   componentDidMount() {

//   }

//   handleSubmit () {

//   }
//   render() {
//     return (
//       <div>
//         <SearchBar/>;
//       </div>
//     );

//   }

// }

const Search = (term, location) => {

  const [ items, setItems ] = useState([]);
  const [ amountResults, setAmountResults ] = useState();
  const [ searchParams, setSearchParams ] = useState({term, location});


  useEffect(() => {
    axios.get('/search')
      .then(({data}) => setItems(data))
      .catch((err) => console.warn(err));
  });

  // search bar styles
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const classes = useStyles();



  return (
    <div>

      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Business, location"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        {/* {
          items.map((item, i) => {
            return (
              <div key={ String(i)}>
                <div>{item.name}</div>
                <div>{item.rating}</div>
                <div>{item.location}</div>
              </div>
            );
          })
        } */}
      </div>
    </div>
  );

};

export default Search;


