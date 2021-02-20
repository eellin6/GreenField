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
            <option value="3301 veterans memorial blvd, metairie, la">Lakeside Mall</option>
            <option value="4700 veterans memorial blvd, metairie, la">Cafe Du Monde</option>
            <option value="718 st peter, new orleans, la">Pat O'Brien's</option>
            <option value="1751 gentilly blvd, new orleans, la">The Fair Grounds</option>
            <option value="701 decatur st, new orleans, la">Jackson Square</option>
            <option value="1500 sugar bowl dr, new orleans, la">Superdome</option>
            <option value="1 palm dr, new orleans, la">City Park</option>
            <option value="cres park trail, new orleans, la">Crescent Park</option>
            <option value="6500 magazine st, new orleans, la">Zoo</option>
            <option value="1 terminal dr, kenner, la">New Orleans Airport</option>
            <option value="baton rouge, la">Baton Rouge</option>
          </select>
          <b>End: </b>
          <select id="end">
            <option value="new orleans, la">New Orleans</option>
            <option value="3301 veterans memorial blvd, metairie, la">Lakeside Mall</option>
            <option value="4700 veterans memorial blvd, metairie, la">Cafe Du Monde</option>
            <option value="718 st peter, new orleans, la">Pat O'Brien's</option>
            <option value="1751 gentilly blvd, new orleans, la">The Fair Grounds</option>
            <option value="701 decatur st, new orleans, la">Jackson Square</option>
            <option value="1500 sugar bowl dr, new orleans, la">Superdome</option>
            <option value="1 palm dr, new orleans, la">City Park</option>
            <option value="cres park trail, new orleans, la">Crescent Park</option>
            <option value="6500 magazine st, new orleans, la">Zoo</option>
            <option value="1 terminal dr, kenner, la">New Orleans Airport</option>
            <option value="baton rouge, la">Baton Rouge</option>
          </select>
        </div>
      </div>

    );
  }
}

export default Map2;
