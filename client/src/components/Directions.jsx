// import React from 'react';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import GoogleMapReact from 'google-map-react';
// import { GOOGLEMAPS_TOKEN, directions } from '../../../config';

// const Directions = () => {

//   const initMap = () => {
//     const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 7,
//       center: { lat: 41.85, lng: -87.65 },
//     });
//     directionsRenderer.setMap(map);

//     const onChangeHandler = function () {
//       calculateAndDisplayRoute(directionsService, directionsRenderer);
//     };
//     document.getElementById('start').addEventListener('change', onChangeHandler);
//     document.getElementById('end').addEventListener('change', onChangeHandler);
//   };

//   const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
//     directionsService.route(
//       {
//         origin: {
//           query: document.getElementById('start').value,
//         },
//         destination: {
//           query: document.getElementById('end').value,
//         },
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (response, status) => {
//         if (status === 'OK') {
//           directionsRenderer.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       }
//     );
//   };

//   const render = () => {
//     return (
//       <div id="floating-panel">
//         <b>Start: </b>
//         <select id="start">
//           <option value="chicago, il">Chicago</option>
//           <option value="st louis, mo">St Louis</option>
//           <option value="joplin, mo">Joplin, MO</option>
//           <option value="oklahoma city, ok">Oklahoma City</option>
//           <option value="amarillo, tx">Amarillo</option>
//           <option value="gallup, nm">Gallup, NM</option>
//           <option value="flagstaff, az">Flagstaff, AZ</option>
//           <option value="winona, az">Winona</option>
//           <option value="kingman, az">Kingman</option>
//           <option value="barstow, ca">Barstow</option>
//           <option value="san bernardino, ca">San Bernardino</option>
//           <option value="los angeles, ca">Los Angeles</option>
//         </select>
//         <b>End: </b>
//         <select id="end">
//           <option value="chicago, il">Chicago</option>
//           <option value="st louis, mo">St Louis</option>
//           <option value="joplin, mo">Joplin, MO</option>
//           <option value="oklahoma city, ok">Oklahoma City</option>
//           <option value="amarillo, tx">Amarillo</option>
//           <option value="gallup, nm">Gallup, NM</option>
//           <option value="flagstaff, az">Flagstaff, AZ</option>
//           <option value="winona, az">Winona</option>
//           <option value="kingman, az">Kingman</option>
//           <option value="barstow, ca">Barstow</option>
//           <option value="san bernardino, ca">San Bernardino</option>
//           <option value="los angeles, ca">Los Angeles</option>
//         </select>
//         {/* <div id="map"></div> */}
//       </div>
//     );
//   };

//   return (
//     <div>
//       {
//         render()
//       }

//     </div>


//   );
// };

// // export default Directions;

// export default GoogleApiWrapper({
//   apiKey: GOOGLEMAPS_TOKEN
// })(Directions);


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
    };
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: 'New Orleans',
        destination: 'Baton Rouge',
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
