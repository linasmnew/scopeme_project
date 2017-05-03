import React from 'react';
import ProfileUpdateForm from './ProfileUpdateForm';
import PasswordChangeForm from './PasswordChangeForm';
import DeleteProfileImage from './DeleteProfileImage';

import { profileValidation, passwordChangeValidation } from './profileValidation';

class UpdateProfile extends React.Component {

  state = {
    fullName: '',
    description: '',
    email: '',
    image: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    bioUpdateSuccessMessage: '',
    passwordUpdateSuccessMessage: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      fullName: nextProps.profile.bio ? nextProps.profile.bio.fullName : '',
      description: nextProps.profile.bio ? nextProps.profile.bio.description : '',
      email: nextProps.profile.email ? nextProps.profile.email : '',
      username: nextProps.profile.username ? nextProps.profile.username : '',
    });
  }

  handleChange = (e) => {
    if(this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];

      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, description, email, username } = this.state;
    const {validationErrors, isValid} = profileValidation({ fullName, description, email, username });

    if (isValid) {
      this.props.updateProfileRequest({fullName, description, email, username}).then(() => {
        this.setState({bioUpdateSuccessMessage: 'Profile updated'});
      }).catch(err => {
        //if can't reach server
        if(!err.response) return this.setState({ errors: err.global, bioUpdateSuccessMessage: ''});
        //if custom error from server
        if (err.response) return err.response.json().then(data => this.setState({errors: data.errors, successMessage: ''}));
      });
    } else {
      return this.setState({ errors: validationErrors});
    }
  }

  handlePasswordChangeSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, newPasswordConfirm } = this.state;
    const {validationErrors, isValid} = passwordChangeValidation({ oldPassword, newPassword, newPasswordConfirm });

    if (isValid) {
      this.props.changePassword({oldPassword, newPassword, newPasswordConfirm}).then((data) => {
        this.setState({passwordUpdateSuccessMessage: 'Profile updated'});
      }).catch(err => {
        //if can't reach server
        if(!err.response) return this.setState({ errors: err.global, passwordUpdateSuccessMessage: ''});
        //if custom error from server
        if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
      });
    } else {
      return this.setState({ errors: validationErrors});
    }
  }

  handleAccountRemoval = (e) => {
    this.props.removeAccount().then(() => {
      // window.location.reload();
      this.props.replace('/');
    });
  }

  render() {
    return (
      <div>
        <div className="auth_component_container">
          <ProfileUpdateForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        </div>

        <div className="auth_component_container">
          <PasswordChangeForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handlePasswordChangeSubmit}  />
        </div>

        <div className="auth_component_container">
          <DeleteProfileImage removeAccount={this.handleAccountRemoval} />
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
