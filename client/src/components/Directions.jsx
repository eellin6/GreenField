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
            strokeColor: '#38B332',
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
        <div id="floating-panel">
          <b>Start: </b>
          <select id="start">
            <option value="new orleans, la">New Orleans</option>
            <option value="baton rouge, la">Baton Rouge</option>
            <option value="birmingham, al">Birmingham</option>
            <option value="dallas, tx">Dallas</option>
            <option value="miami, fl">Miami</option>
            <option value="philadelphia, pa">Philadelphia</option>
            <option value="new york, ny">New York</option>
            <option value="chicago, il">Chicago</option>
            <option value="las vegas, nv">Las Vegas</option>
            <option value="los angeles, ca">Los Angeles</option>
            <option value="san francisco, ca">San Francisco</option>
            <option value="seattle, wa">Seattle</option>
          </select>
          <b>End: </b>
          <select id="end">
            <option value="new orleans, la">New Orleans</option>
            <option value="baton rouge, la">Baton Rouge</option>
            <option value="birmingham, al">Birmingham</option>
            <option value="dallas, tx">Dallas</option>
            <option value="miami, fl">Miami</option>
            <option value="philadelphia, pa">Philadelphia</option>
            <option value="new york, ny">New York</option>
            <option value="chicago, il">Chicago</option>
            <option value="las vegas, nv">Las Vegas</option>
            <option value="los angeles, ca">Los Angeles</option>
            <option value="san francisco, ca">San Francisco</option>
            <option value="seattle, wa">Seattle</option>
          </select>
        </div>
      </div>

    );
  }
}

export default Map2;
