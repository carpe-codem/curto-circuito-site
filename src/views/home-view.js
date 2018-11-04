import React from 'react';
import { 
  Container, 
  Input, 
  InputGroup, 
  FormGroup,
  Label, 
  InputGroupButtonDropdown,
  InputGroupAddon,
  Button, 
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// Component Style
import '../style/home.scss';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      origin: '',
      destination: '',
      originCoords: {},
      destinationCoords: {},
      walkingDistance: 200
    };
  }
  
  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  getCurrentLocation = () => {
    this.setState({ gps: true }, () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError, { timeout:10000,  maximumAge: 0 });
      }
    });
  }

  setCurrentLocation = (position) => {
    /*global google */
    let geocoder = new google.maps.Geocoder();
    let location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    let latlng = { location };

      geocoder.geocode(latlng, (results, status) => {
        if (status === 'OK') {
          this.setState({ origin: results[0].formatted_address, gps: false, originCoords: location });
        } else {
          this.setState({ gps: false })
        }
      });
  }

  showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
      default:
        console.log("An unknown error occurred.");
    }

    this.setState({ gps: false })
  }

  handleOriginChange = origin => {
    this.setState({ origin });
  };

  handleOriginSelect = origin => {
    geocodeByAddress(origin)
      .then(results => {
        this.setState({ origin })
        return getLatLng(results[0])
      })
      .then(latLng => {
        this.setState({ originCoords: latLng });
      })
      .catch(error => console.error('Error', error));
  };

  handleDestinationChange = destination => {
    this.setState({ destination });
  };

  handleDestinationSelect = destination => {
    geocodeByAddress(destination)
      .then(results => {
        this.setState({ destination })
        return getLatLng(results[0])
      })
      .then(latLng => {
        this.setState({ destinationCoords: latLng });
      })
      .catch(error => console.error('Error', error));
  };

  setWalkingDistance = (distance) => {
    this.setState({ walkingDistance: distance });
  }
  
  render() {
    return (
      <section id="search">
        <Container>
          <FormGroup>
            <Label>Saindo de</Label>
            <PlacesAutocomplete
              value={this.state.origin}
              onChange={this.handleOriginChange}
              onSelect={this.handleOriginSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <React.Fragment>
                  <InputGroup>
                    <Input
                      {...getInputProps({
                        placeholder: 'Minha origem' 
                      })}
                    />
                    <InputGroupAddon addonType="append">
                      <Button onClick={this.getCurrentLocation}>
                      { this.state.gps || loading
                      ? <i className="fa fa-spinner fa-spin fa-lg" aria-hidden="true"/>
                      : <i className="fa fa-map-marker fa-lg" aria-hidden="true" />
                      }
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  { suggestions.length > 0 &&
                    <div className="autocomplete-dropdown-container">
                      {suggestions.slice(0,2).map(suggestion => {
                        const className = 'suggestion-item';
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className
                            })}
                          >
                            <span>{suggestion.description}</span>
                            <hr />
                          </div>
                          
                        );
                      })}
                    </div>
                  }
                </React.Fragment>
              )}
            </PlacesAutocomplete>
          </FormGroup>
          <FormGroup>
            <Label>Quero chegar a</Label>
            <PlacesAutocomplete
              value={this.state.destination}
              onChange={this.handleDestinationChange}
              onSelect={this.handleDestinationSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <React.Fragment>
                  <InputGroup>
                    <Input
                      {...getInputProps({
                        placeholder: 'Meu destino' 
                      })}
                    />
                  </InputGroup>
                  { suggestions.length > 0 &&
                    <div className="autocomplete-dropdown-container">
                      {suggestions.slice(0,2).map(suggestion => {
                        const className = 'suggestion-item';
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className
                            })}
                          >
                            <span>{suggestion.description}</span>
                            <hr />
                          </div>
                          
                        );
                      })}
                    </div>
                  }
                </React.Fragment>
              )}
            </PlacesAutocomplete>
          </FormGroup>
          <FormGroup row>
            <Label>Andando no máximo</Label>
            <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
              <Button onClick={this.toggleSplit} outline>{`${this.state.walkingDistance} m`}</Button>
              <DropdownToggle split outline />
              <DropdownMenu>
                <DropdownItem header>Aceito andar até</DropdownItem>
                <DropdownItem onClick={() => this.setWalkingDistance(100)}>100 metros</DropdownItem>
                <DropdownItem onClick={() => this.setWalkingDistance(200)}>200 metros</DropdownItem>
                <DropdownItem onClick={() => this.setWalkingDistance(500)}>500 metros</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </FormGroup>
          <Button onClick={() => this.props.history.push('/mapa')} color="primary" size="lg" block>ESTACIONE-ME</Button>
        </Container>
      
      </section>
      )
    }
  }