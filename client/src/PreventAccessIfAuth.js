import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


export default function(ComposedClass) {
  class PreventAccessIfAuth extends React.Component {

    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.replace('/dashboard');
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === false ? <ComposedClass {...this.props} /> : null}
        </div>
      );
    }

  }


  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }



  return connect(mapStateToProps)(PreventAccessIfAuth);
}
