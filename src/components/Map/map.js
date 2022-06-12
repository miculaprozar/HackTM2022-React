import React, {useState, useEffect, Component} from 'react';
import {compose, withProps, lifecycle} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
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

class CustomMarker extends Component {
  state = {
    showInfoWindow: false,
  };
  handleMouseOver = (e) => {
    this.setState({
      showInfoWindow: true,
    });
  };
  handleMouseExit = (e) => {
    this.setState({
      showInfoWindow: false,
    });
  };
  render() {
    const {showInfoWindow} = this.state;
    const {info, lat, lng, idu} = this.props;
    return (
      <Marker
        position={{lat, lng}}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseExit}
        onClick={() => {
          this.props.history.push(`/wholesale/producer/${idu}`);
        }}
      >
        {showInfoWindow && (
          <InfoWindow>
            <h4>{info}</h4>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

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
          console.log(coords);

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
          <CustomMarker
            lat={farmer.locations[0].latitude}
            lng={farmer.locations[0].longitude}
            info={farmer.companyName}
            idu={farmer.id}
            {...props}
          ></CustomMarker>
        );
      })}
  </GoogleMap>
));

export default Map;
