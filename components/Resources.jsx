import React from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  return (
    <React.Fragment>
      <div className="Below-TopBar-Area">
        <div className="Resource-area">
          <span>
            <i className="fas fa-car" />
            <span>Transportation</span>
          </span>

          <span>
            <i class="fas fa-utensils" />
            <span>Food</span>
          </span>
          <span>
            <i class="fas fa-calendar-alt" />
            <span>Events</span>
          </span>
          <span>
            <i class="fas fa-home" />
            <span>Rentals</span>
          </span>
          <span>
            <i class="fas fa-address-card" />
            <span>Jobs</span>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Resources;
