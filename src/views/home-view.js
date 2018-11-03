import React from 'react';
import { 
  Container, 
  Input, 
  InputGroup, 
  FormGroup,
  Label, 
  InputGroupButtonDropdown,
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
  
  
  render() {
    return (
      <section id="search">
        <Container>
          <FormGroup>
            <Label>Saindo de</Label>
            <Input placeholder='Minha origem' />
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