import React, { Component } from 'react';
import GoogleApiWrapper from './Map';
import axios from 'axios';
import CreateMarker from '../components/AddMarker/CreateMarker';
import { AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Search from '../components/Search';
import Flights from './Flights.jsx';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seen: false,
      isLoggedIn: false,
      view: 'map',
      lat: 29.9,
      lng: -91.6,
      inputValue: ''
    };

    this.changeView = this.changeView.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }


  handleLogout() {
    axios.get('/logout')
      .then(console.log('You successfully logged out'))
      .catch(err => console.error('error logging out', err));
  }


  changeView(option) {
    this.setState({
      view: option
    });
  }


  renderView() {
    const { view, lat, lng } = this.state;
    // This will render different views when navigation is clicked
    if (view === 'map') {
      return <GoogleApiWrapper handleClick={() => this.changeView('anypostview')}/>;
    } else if (view === 'addMarker') {
      return <CreateMarker changeView={this.changeView} handleClick={() => this.changeView('anypostview')}/>;
    } else if (view === 'flights') {
      return <Flights changeView={this.changeView} handleClick={() => this.changeView('flights')}/>;
    }
  }


  render() {
    const { view, isLoggedIn } = this.state;
    //if the status of a user is not logged in, display a login button
    const status = 'Login';
    // if(isLoggedIn){
    //   //if the status of a user is logged in, display logout button
    //   status = 'Logout'
    // }

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
      title: {flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
    }));


    return (

      <div >
        <header>
          <img src="https://i.ibb.co/ry3RrBM/NOLA-bound-logo.png"
            alt="NOLA-bound-logo"
            height="200px" width="auto"/>
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
        </header>
        <div className='nav'>
          <AppBar position="static">
            <Toolbar>
              <Grid container direction="row" alignItems="center" spacing={5}>
                <Grid item>

                  <Button className={styles.menuButton} color="inherit" aria-label="Menu"
                    onClick={() => this.changeView('map')}>
                    <HomeIcon />
                    <Typography variant="h6" className={useStyles.title}>
                Home
                    </Typography>
                  </Button>
                </Grid>


                <div>

                  <Grid item>
                    <Button
                      className="btn"
                      type="button"
                      position="relative"
                      color="inherit"
                      onClick={() => this.changeView('addMarker')}
                    >
                      <Typography variant="h6">
                Add a Pin
                      </Typography>
                    </Button>
                  </Grid>

                </div>
                <div>
                  <Grid item>
                    <Search />
                  </Grid>
                </div>
                <div>
                  <Grid item>
                    <Button
                      className="btn"
                      type="button"
                      position="relative"
                      color="inherit"
                      onClick={() => this.changeView('flights')}
                    >
                      <Typography variant="h6">
                Flights
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button className="btn"
                      color="inherit"
                      onClick={function signOut() {
                        const auth2 = gapi.auth2.getAuthInstance();
                        auth2.signOut().then(function () {
                          console.log('User signed out.');
                        });
                      }}>Sign out
                    </Button>
                  </Grid>
                </div>
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