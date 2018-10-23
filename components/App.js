import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar.jsx';
import Resources from './Resources.jsx';
import Events from './Events.jsx';
import Transportation from './Transportation';
import Jobs from './Jobs.jsx';
import Rentals from './Rentals.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  handleClick = () => {
    console.log('I was clicked');
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <NavBar />
          </header>
          <Resources />
        </div>
        <Router>
          <div>
            {/* <Route exact path="/" component={Home} /> */}
            <Route path="/transportation" component={Transportation} />
            <Route path="/events" component={Events} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/jobs" component={Jobs} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}