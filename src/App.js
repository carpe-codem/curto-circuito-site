import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Views
import HomeView from './views/home-view';
import MapView from './views/map-view';

// Global styling
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <main className="App">
        <h1>CURTO CIRCUITO</h1>
        <Router>
          <Switch>
            <Route path='/mapa' component={MapView}/>
            <Route exact path='/' component={HomeView}/>

            {/* Route not found - 404 */}
            <Route component={HomeView}/>
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
