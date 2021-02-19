import React, { Component } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Polyline
} from 'react-google-maps';
class Map2 extends Component {
  constructor() {
    super();
    this.state = {
      directions: null,
      start: null,
      end: null,
    };
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);

    const calculateAndDisplayRoute = (directionsService) => {
      directionsService.route(
        {
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
          // this.setState({
          //   directions: result
          // });
            const overViewCoords = result.routes[0].overview_path;
            this.setState({
              directions: overViewCoords,
            });
          } else {
            console.warn(`error fetching directions ${result}`);
          }
        }
      );
    };


  }

  render() {
    const { directions } = this.state;

    const GoogleMapExample = withGoogleMap(() => (
      <GoogleMap
        defaultCenter={{ lat: 29.95, lng: -90.07 }}
        defaultZoom={13}
      >
        <Polyline
          path={directions}
          options={{
            strokeColor: '#38B',
            strokeOpacity: 1,
            strokeWeight: 7,
          }}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '75vh' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

export default Map2;
