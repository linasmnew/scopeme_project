import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
    </ul>
  );
}
