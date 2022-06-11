import React, {useState, useEffect} from 'react';
import {compose, withProps, lifecycle} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Map = (props) => {
  useEffect(() => {
    localStorage.removeItem('locationToAdd');
  }, []);

  return (
    <>
      <ActualMap isMarkerShown={props.isMarkerShown}></ActualMap>
    </>
  );
};

const ActualMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAaTB74UBsFLP-FWRQ3yaXKwOgs2TDYNfI&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `560px`, width: `100%`}} />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          localStorage.setItem('locationToAdd', position);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => (
  <GoogleMap defaultZoom={7} defaultCenter={{lat: 45.944, lng: 25.009}}>
    {props.isMarkerShown && (
      <Marker
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
        position={{lat: 45.944, lng: 25.009}}
      />
    )}
  </GoogleMap>
));

export default Map;
