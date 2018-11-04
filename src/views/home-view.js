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

// Component Style
import '../style/home.scss';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false
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
        navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError);
      }
    });
  }

  setCurrentLocation = (position) => {
    console.log(position);
    this.setState({ gps: false })
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
  
  
  render() {
    return (
      <section id="search">
        <Container>
          <FormGroup>
            <Label>Saindo de</Label>
            <InputGroup>
              <Input placeholder='Minha origem' />
              <InputGroupAddon addonType="append">
                <Button onClick={this.getCurrentLocation}>
                { this.state.gps
                ? <i className="fa fa-spinner fa-spin fa-lg" aria-hidden="true"/>
                : <i className="fa fa-map-marker fa-lg" aria-hidden="true" />
                }
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>Quero chegar a</Label>
            <Input placeholder="Meu destino" />
          </FormGroup>
          <FormGroup row>
            <Label>Andando no máximo</Label>
            <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
              <Button outline>200 m</Button>
              <DropdownToggle split outline />
              <DropdownMenu>
                <DropdownItem header>Aceito andar até</DropdownItem>
                <DropdownItem>100 metros</DropdownItem>
                <DropdownItem>200 metros</DropdownItem>
                <DropdownItem>500 metros</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </FormGroup>
          <Button onClick={() => this.props.history.push('/mapa')} color="primary" size="lg" block>ESTACIONE-ME</Button>
        </Container>
      
      </section>
      )
    }
  }