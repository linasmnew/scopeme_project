import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from './ProfilePage';
import ScopesList from './ScopesList';
import { getPublicProfile, getAllScopesRequest } from '../../actions/publicProfile/profile';

//used for getting app_wrappers classNames, changing it for this page, and changing it back on umount
let app_wrapper_classNames;
let app_wrapper;

class PublicProfilePage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.username !== nextProps.match.params.username) {

      this.props.getPublicProfile(nextProps.match.params.username).then(() => {
      }).catch(err => {
        console.log('profile request errored');
      });

      this.props.getAllScopesRequest(nextProps.match.params.username).then(() => {
      }).catch(err => {
        console.log('profile request errored');
      });
    }
  }


  componentDidMount() {
    app_wrapper_classNames = document.getElementsByClassName('app_wrapper')[0].className;
    app_wrapper = document.getElementsByClassName('app_wrapper');

    app_wrapper[0].className = 'app_wrapper user_app_wrapper';

    this.props.getPublicProfile(this.props.match.params.username).then(() => {
    }).catch(err => {
      console.log('profile request errored');
    });

    this.props.getAllScopesRequest(this.props.match.params.username).then(() => {
    }).catch(err => {
      console.log('profile request errored');
    });

  }


  componentWillUnmount() {
    //setting className back to what it was before visiting this page
    app_wrapper[0].className = app_wrapper_classNames;
  }


  render() {
    return (
      <div>
        <div className="auth_component_container">
          <ProfilePage username={this.props.bioAndUsername.username} bio={this.props.bioAndUsername.bio} />
        </div>

        <div className="auth_component_container">
          <ScopesList scopes={this.props.scopes} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bioAndUsername: state.publicProfile.bioAndUsername,
    scopes: state.publicProfile.scopes
  };
}

export default connect(mapStateToProps, { getPublicProfile, getAllScopesRequest })(PublicProfilePage);
