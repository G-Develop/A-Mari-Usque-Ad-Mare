import React from 'react';

const NavBar = () => {
  return (
    <React.Fragment>
      <nav>
        <div className="nav-buttons">
          <ul>
            <li>
              <a href="#Windies">Windies</a>
            </li>
            <li id="SignUp">
              <a href="#SignUp">Sign Up</a>
            </li>

            <li>
              <a href="#Login">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
