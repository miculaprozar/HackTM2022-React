import React from 'react';
import {Circle, GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import Geocode from 'react-geocode';
Geocode.setApiKey('AIzaSyAaTB74UBsFLP-FWRQ3yaXKwOgs2TDYNfI');
Geocode.setLanguage('en');

const Map = (props) => {
  return (
    <div style={{width: '100%', height: '300px', backgroundColor: 'teal'}}>
      <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}}>
        {props.isMarkerShown && (
          <Marker position={{lat: -34.397, lng: 150.644}} />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
