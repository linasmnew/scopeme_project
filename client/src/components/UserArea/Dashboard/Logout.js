import React from 'react';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../actions/logout';

class Logout extends React.Component {
  componentWillMount() {
    this.props.dispatch(logoutRequest()).then(() => {
      this.props.replace('/login');
    });
  }

  render() {
    return null;
  }
}

export default connect()(Logout);
