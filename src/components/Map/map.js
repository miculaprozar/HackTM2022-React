import React, {useState, useEffect} from 'react';
import {compose, withProps, lifecycle} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Map = (props) => {
  return (
    <>
      <ActualMap isMarkerShown={props.isMarkerShown} {...props}></ActualMap>
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
          let position = refs.marker.getPosition().toString();
          //remove first and last char from position
          position = position.substring(1, position.length - 1);

          const coords = position.split(',');
          this.props.handleSetPosition({
            latitude: coords[0],
            longitude: coords[1].substring(1, position.length),
          });

          localStorage.setItem(
            'locationToAdd',
            JSON.stringify({
              latitude: coords[0],
              longitude: coords[1].substring(1, position.length),
            }),
          );
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
