import React, { Component } from 'react';
import './main.css';
import NavBar from './NavBar.jsx';
import Resources from './Resources.jsx';
import Events from './Events.jsx';
import Transportation from './Transportation';
import Jobs from './Jobs.jsx';
import Rentals from './Rentals.jsx';
import Food from './Food.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavBar />
          </header>

          <Route exact path="/" component={Resources} />
          <Route path="/transportation" component={Transportation} />
          <Route path="/events" component={Events} />
          <Route path="/food" component={Food} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/jobs" component={Jobs} />
        </div>
      </Router>
    );
  }
}

export default App;
