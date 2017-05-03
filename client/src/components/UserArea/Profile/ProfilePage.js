import React from 'react';
import UpdateProfile from './UpdateProfile';
import { connect } from 'react-redux';
import { getProfileRequest, updateProfileRequest, changePassword, removeAccount } from '../../../actions/profile';

class ProfilePage extends React.Component {

  componentDidMount() {

    this.props.getProfileRequest().catch(err => {
      if (!err.response) return this.setState({ errors: err.global});
      if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
    });
  }

  render() {
    return (
      <div>
        <UpdateProfile replace={this.props.replace} profile={this.props.profile} updateProfileRequest={this.props.updateProfileRequest} changePassword={this.props.changePassword} removeAccount={this.props.removeAccount} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps, { getProfileRequest, updateProfileRequest, changePassword, removeAccount })(ProfilePage);
