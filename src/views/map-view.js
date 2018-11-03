import React from 'react';
import { compose, withProps } from "recompose"
import { GoogleMap, withGoogleMap, withScriptjs, Polyline } from "react-google-maps"

// Component Style
import '../style/map.scss';

const defaultMapOptions = {
  fullscreenControl: false,
  disableDefaultUI: true
};

class MapView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: -23.0122004,
      lng: -43.3091548,
      zoom: 14
    }
  }

  componentDidMount() {
    this.getGoogle();
  }

  getGoogle = () => {
    /*global google */
    if (!google) {
      console.log('LOOKING FOR GOOGLE');
      setTimeout(this.getGoogle, 1000);
    } else {
      console.log('GOOGLE FOUND!')
      let directionsService = new google.maps.DirectionsService()
      this.getRoute(directionsService);
    }
  }

  getRoute = (directionsService) => {
    let request = {
      origin: {lat: -23.012768, lng: -43.311027},
      destination: {lat: -23.009043, lng: -43.314853},
      waypoints: [
        { location: {lat: -23.008206, lng: -43.315070}, stopover: false},
        { location: {lat: -23.008885, lng: -43.313630}, stopover: false},
        { location: {lat: -23.009774, lng: -43.313600}, stopover: false},
        { location: {lat: -23.010075, lng: -43.314260}, stopover: false},
        { location: {lat: -23.009799, lng: -43.315306}, stopover: false},
        { location: {lat: -23.009388, lng: -43.315998}, stopover: false}
      ],
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if(status === 'OK') {
        this.setState({ route: result.routes[0].overview_path });
      }
    });
  };

  render() {
    let position = { lat: this.state.lat, lng: this.state.lng };

    return (
      <GoogleMap 
        defaultCenter={position} 
        defaultZoom={this.state.zoom} 
        defaultOptions={defaultMapOptions}  
      >
        <Polyline
          path={this.state.route}
          geodesic={false}
          options={{
              strokeColor: '#E54D13',
              strokeOpacity: 1,
              strokeWeight: 7,
          }}
        />
      </GoogleMap>
    )
  }
}

const mapProps = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCKLToq3Xfzj-IfIO-y931NlVQJiKOLd2M",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <section id="map" />,
  mapElement: <div style={{ height: `100%` }} />,
};

let composedMap = compose(
  withProps(mapProps),
  withScriptjs,
  withGoogleMap
)(MapView);

export default composedMap;