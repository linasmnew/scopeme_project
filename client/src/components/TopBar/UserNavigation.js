import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/logout">Logout</Link></li>
    </ul>
  );
}
