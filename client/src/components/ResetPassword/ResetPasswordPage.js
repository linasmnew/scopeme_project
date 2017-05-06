import React from 'react';
import { connect } from 'react-redux';
import EmailForm from './EmailForm';
import NewPasswordForm from './NewPasswordForm';
import { resetPasswordRequest, newPasswordRequest } from '../../actions/resetPassword';
import { passwordCreateValidation, emailValidation  } from './resetValidation';

class PasswordResetPage extends React.Component {

  state = {
    email: '',
    emailSuccessMessage: '',
    newPassword: '',
    newPasswordConfirm: '',
    passwordSuccessMessage: '',
    errors: {}
  };


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

  emailSubmit = () => {
    const { email } = this.state;
    const {validationErrors, isValid} = emailValidation({ email });

    if(isValid) {
      this.props.resetPasswordRequest({email}).then(() => {
        //only gets called on 200 response, because handleResponse throws error if response not ok
        this.setState({emailSuccessMessage: 'If the entered email address was correct, you will receive a reset link in your email address'});
      }).catch(err => {
        if(!err.response) return this.setState({ errors: err.global});
        if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
      });
    } else {
      return this.setState({ errors: validationErrors});
    }
  }

  newPasswordSubmit = () => {
    const { newPassword, newPasswordConfirm } = this.state;
    const token = this.props.match.params.id;
    const {validationErrors, isValid} = passwordCreateValidation({ newPassword, newPasswordConfirm });

    if(isValid) {
      this.props.newPasswordRequest({newPassword, newPasswordConfirm}, token).then(() => {
        this.setState({passwordSuccessMessage: 'Password created successfuly'});
        //do whatever on success, if dispatch was used in async action creator
        //render gets called before this, otherwise this get's called directly
        //after async action creator resolves
      }).catch(err => {
        if(!err.response) return this.setState({ errors: err.global});
        if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
      });
    } else {
      return this.setState({ errors: validationErrors});
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.props.match.params.id) {
      this.newPasswordSubmit();
    } else {
      this.emailSubmit();
    }

  }

  render() {

    let idExists = !!this.props.match.params.id;
      return (
        <div className="guest_component_container">
        { idExists ?
          <NewPasswordForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> :
          <EmailForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        }
        </div>
      );
  }
}

PasswordResetPage.contextTypes = {
  router: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { resetPasswordRequest, newPasswordRequest })(PasswordResetPage);
