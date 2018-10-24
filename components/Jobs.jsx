import React from 'react';
import Maps from './Maps.jsx';

const Food = () => (
  <div>
    <Maps
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDY6pLjRt7V5HFa3f8xejt_JfYdOD5zacM&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
);

export default Food;
