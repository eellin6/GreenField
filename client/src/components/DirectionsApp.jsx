import React from 'react';
import { withScriptjs } from 'react-google-maps';
import Map2 from './Directions.jsx';

const App2 = () => {

  const MapLoader = withScriptjs(Map2);

  return (

    <div className="App2">
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnvDK_pdAFPnpRVDTmch3T0uCiDGMW2E"
        loadingElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};

export default App2;
