import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from 'google-maps-react';


const getTravelTime = (origin, destination) => {
  const directionsService = new google.maps.DirectionsService();
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      console.log(result);
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        setError(result);
      }
    }
  );
};

