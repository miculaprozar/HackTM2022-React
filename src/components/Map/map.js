import React, {useState, useEffect} from 'react';
import {compose, withProps, lifecycle} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import {useHistory} from 'react-router-dom';

const Map = (props) => {
  const history = useHistory();
  return (
    <>
      <ActualMap
        isMarkerShown={props.isMarkerShown}
        history={history}
        {...props}
      ></ActualMap>
    </>
  );
};

const ActualMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAaTB74UBsFLP-FWRQ3yaXKwOgs2TDYNfI&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: (
      <div
        style={{
          height: `660px`,
          width: `100%`,
        }}
      />
    ),
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
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => (
  <GoogleMap defaultZoom={7} defaultCenter={{lat: 45.944, lng: 25.009}}>
    {props.isMarkerShown && !props.isProducerMap && (
      <Marker
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
        position={props.markerLocation}
      />
    )}
    {props.isProducerMap &&
      props.localFarmers &&
      props.localFarmers.map((farmer) => {
        console.log(farmer);
        return (
          <Marker
            draggable={false}
            key={farmer.id}
            position={{
              lat: farmer.locations[0].latitude,
              lng: farmer.locations[0].longitude,
            }}
            onClick={() => {
              props.history.push(`/wholesale/producer/${farmer.id}`);
            }}
            onMouseOver={() => {
              console.log('mouse over');
            }}
          ></Marker>
        );
      })}
  </GoogleMap>
));

export default Map;
