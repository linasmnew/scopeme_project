import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
      return (
        <div className="homepage_content_container">
          <h2>
            Homepage text.
          </h2>
          <Link className="link_getStarted" to="/signup">Get Started</Link>
        </div>
      );
  }
}

export default HomePage;
