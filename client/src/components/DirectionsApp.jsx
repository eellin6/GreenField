import React from 'react';
import { withScriptjs } from 'react-google-maps';
import Map2 from './Directions.jsx';

const App2 = () => {

  const MapLoader = withScriptjs(Map2);

  return (

    <div className="App2">
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyApJprtU8Vs2A4LnROUFoL7aEq8qMEeOGE"
        loadingElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};

export default App2;
