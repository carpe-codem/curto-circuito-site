import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/header';

// Views
import HomeView from './views/home-view';
import MapView from './views/map-view';

// Global styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/global.scss';

/* global window */
class App extends Component {
  render() {
    return (
      <main id="App">
        <Container>
          <Router>
            <React.Fragment>
              <Header />
              <Switch>
                <Route path='/mapa' component={MapView}/>
                <Route exact path='/' component={HomeView}/>

                {/* Route not found - 404 */}
                <Route component={HomeView}/>
              </Switch>
            </React.Fragment>
          </Router>
        </Container>
      </main>
    );
  }
}

export default App;
