import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className={classnames('not_found_page_container', {not_found_page_guest: !this.props.isAuthenticated })}>
        <h1>Sorry, could not find the requested page</h1>
        <p>This happened because the provided link was invalid, or the page has been removed</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(PageNotFound);
