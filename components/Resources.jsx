import React from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  return (
    <React.Fragment>
      <div className="Below-TopBar-Area">
        <div className="Resource-area">
          <Link to="/transportation">
            <span>
              <i className="fas fa-car" />
              <span>Transportation</span>
            </span>
          </Link>
          <Link to="/food">
            <span>
              <i class="fas fa-utensils" />
              <span>Food</span>
            </span>
          </Link>
          <Link to="/events">
            <span>
              <i class="fas fa-calendar-alt" />
              <span>Events</span>
            </span>
          </Link>
          <Link to="/rentals">
            <span>
              <i class="fas fa-home" />
              <span>Rentals</span>
            </span>
          </Link>
          <Link to="/jobs">
            <span>
              <i class="fas fa-address-card" />
              <span>Jobs</span>
            </span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Resources;
