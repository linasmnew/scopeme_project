import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signupRequest } from '../../actions/signup';
import { authValidation } from './authValidation';

class SignupPage extends React.Component {
  state = {
    email: '',
    password: '',
    redirect: false,
    errors: {}
  };

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.replace('/dashboard');
    }
  }

  handleChange = (e) => {
    if(this.state.errors[e.target.name]) {
      //clone errors from state
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
      const { email, password } = this.state;
      const {validationErrors, isValid} = authValidation({email, password});

      if(isValid) {
        this.props.signupRequest({email, password}).then(() => {
          //gets called after dashboard mounts
           this.setState({redirect: true});
        }).catch(err => {
          //if can't reach server
          if(!err.response) return this.setState({ errors: err.global});
          //if custom error from server
          if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
        });
      } else {
        return this.setState({ errors: validationErrors});
      }
  }

  render() {
      return (
        <div className="guest_component_container">
          {this.state.redirect && <Redirect to="/create-username" />}

          <form onSubmit={this.handleSubmit}>
           {!!this.state.errors.global && <div className="general_form_error"><p>{this.state.errors.global}</p></div>}

            <div className={classnames({field_error: !!this.state.errors.email})}><p>{this.state.errors.email}</p></div>
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange}  placeholder="Email" />

            <div className={classnames({field_error: !!this.state.errors.password})}><p>{this.state.errors.password}</p></div>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />

            <button>Register</button>
          </form>
          <p className="authentication_info_p">By registering to Contactly you agree to
our <Link to="/terms" className="authentication_info_link">terms & privacy policy</Link></p>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { signupRequest })(SignupPage);
