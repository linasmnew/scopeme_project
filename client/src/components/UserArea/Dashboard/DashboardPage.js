import React from 'react';
import AddNewScope from './AddNewScope';
import ScopesList from './ScopesList';
import Profile from './Profile';
import { connect } from 'react-redux';
import { addScopeRequest, getAllScopesRequest, removeScopeRequest } from '../../../actions/scopes';
import { getProfileRequest } from '../../../actions/profile';
import { uploadPhotoRequest } from '../../../actions/photoUpload';

class DashboardPage extends React.Component {

  state = {
    errors: {},
    fetching: false
  };

  componentDidMount() {

    this.props.getProfileRequest().catch(err => {
      if (!err.response) return this.setState({ errors: err.global});
      if (err.response) return err.response.json().then(data => {
        if(this.refs.myRef) return this.setState({errors: data.errors});
      });
    });


    this.props.getAllScopesRequest().catch(err => {
      //if can't reach server
      if (!err.response) {
        if(this.refs.myRef) return this.setState({ errors: err.global});
      }
      //if custom error from server
      if (err.response) return err.response.json().then(data =>  {
         if(this.refs.myRef) return this.setState({errors: data.errors});
      });
    });

  }


  render() {
    return (
      <div ref="myRef">

        <div className="auth_component_container">
          <Profile push={this.props.push} profile={this.props.profile} uploadPhotoRequest={this.props.uploadPhotoRequest} />
        </div>

        <div className="auth_component_container">
          <AddNewScope addScopeRequest={this.props.addScopeRequest} />
        </div>

        <div className="auth_component_container">
          <ScopesList scopes={this.props.scopes} removeScope={this.props.removeScopeRequest} />
        </div>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    scopes: state.scopes,
    profile: state.profile
  };
}

export default connect(mapStateToProps, { addScopeRequest, getAllScopesRequest, removeScopeRequest, getProfileRequest, uploadPhotoRequest })(DashboardPage);
