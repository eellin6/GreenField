import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import CreateMarker from '../components/AddMarker/CreateMarker';
import { AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchPage from '../components/Search';
import Flights from './Flights.jsx';
import Restaurant from './Restaurant.jsx';
import Friends from './Friends.jsx';
import Map2 from './Directions.jsx';
import App2 from './DirectionsApp.jsx';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seen: false,
      isLoggedIn: false,
      view: 'map',
      lat: 29.9,
      lng: -91.6,
      inputValue: '',
    };

    this.changeView = this.changeView.bind(this);
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    axios.get('/isLoggedin')
      .then(({ data }) => this.setState({ isLoggedIn: data }))
      .catch((err) => console.warn(err));
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  pleasework() {
    MapLoader = withScriptjs(Map2);
  }

  logout(bool) {
    this.setState({ isLoggedIn: bool });
  }


  renderView() {
    const { view, lat, lng } = this.state;
    // This will render different views when navigation is clicked
    if (view === 'map') {
      return <GoogleApiWrapper changeView={() => this.changeView('anypostview')}/>;
    } else if (view === 'addMarker') {
      return <CreateMarker changeView={() => this.changeView('anypostview')}/>;
    } else if (view === 'flights') {
      return <Flights changeView={() => this.changeView('flights')}/>;
    } else if (view === 'search') {
      return <SearchPage changeView={() => this.changeView('search')}/>;
    } else if (view === 'restaurant') {
      return <Restaurant changeView={() => this.changeView('restaurant')}/>;
    } else if (view === 'friends') {
      return <Friends changeView={() => this.changeView('friends')}/>;
    } else if (view === 'directions') {
      return <App2 changeView={() => this.changeView('directions')}/>;
    }

  }


  render() {
    const { view, isLoggedIn } = this.state;

    // styles for NavBar
    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    };

    //styling for AppBar
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
    }));

    return (
      <div >
        <header>
          <div id="logo">
            <img src="https://i.ibb.co/ry3RrBM/NOLA-bound-logo.png"
              alt="NOLA-bound-logo"
              height="175px" width="auto"/>
          </div>
        </header>
        <div className='nav'>
          <AppBar position="static">
            <Toolbar>
              <Grid container direction="row" alignItems="center" spacing={5}>

                <Grid item>
                  <Button
                    className={styles.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => this.changeView('map')}>
                    <HomeIcon />
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className="btn"
                    type="button"
                    position="relative"
                    color="inherit"
                    onClick={() => this.changeView('addMarker')}>
                    <Typography variant="h6">Add a Pin</Typography>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className="btn"
                    type="button"
                    position="relative"
                    color="inherit"
                    onClick={() => this.changeView('flights')}>
                    <Typography variant="h6">Flights</Typography>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className="btn"
                    type="button"
                    position="relative"
                    color="inherit"
                    onClick={() => this.changeView('restaurant')}>
                    <Typography variant="h6">Grub</Typography>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className="btn"
                    type="button"
                    position="relative"
                    color="inherit"
                    onClick={() => this.changeView('friends')}>
                    <Typography variant="h6">Find Friends</Typography>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className="btn"
                    type="button"
                    position="relative"
                    color="inherit"
                    onClick={() => this.changeView('directions')}>
                    <Typography variant="h6">Directions</Typography>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className="btn"
                    type="button"
                    position="relative"
                    color="inherit"
                    onClick={() => this.changeView('search')}
                  >
                    <Typography variant="h6">
                Search
                    </Typography>
                  </Button>
                </Grid>

                <Grid item>
                  {
                    !isLoggedIn
                      ?
                      <div>
                        <a className='loginButton' href="/auth/google"><GoogleButton /></a>
                      </div>
                      :
                      <div>
                        <Button
                          className='btn'
                          color="inherit"
                          onClick={() => axios.delete('/logout')
                            .then(({ data }) => this.logout(data))
                            .catch((err) => console.warn(err))} >
                          <Typography variant="h6">Sign out</Typography>
                        </Button>
                      </div>
                  }
                </Grid>

              </Grid>
            </Toolbar>
          </AppBar>
        </div>
        {this.renderView()}

      </div>
    );
  }
}
export default App;