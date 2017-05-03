import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../../actions/login';
import { authValidation } from './authValidation';

class LoginPage extends React.Component {

  state = {
    email: '',
    password: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const {validationErrors, isValid} = authValidation({email, password});

    if(isValid) {
      this.props.loginRequest({email, password}).catch(err => {
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
          <form onSubmit={this.handleSubmit}>
          {!!this.state.errors.global && <div className="general_form_error"><p>{this.state.errors.global}</p></div>}

            <div className={classnames({field_error: !!this.state.errors.email})}><p>{this.state.errors.email}</p></div>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}  placeholder="Email" />

            <div className={classnames({field_error: !!this.state.errors.password})}><p>{this.state.errors.password}</p></div>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />

            <button>Login</button>
          </form>
          <p className="authentication_info_p">Forgot your password? <Link to="/reset" className="authentication_info_link">reset</Link></p>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { loginRequest })(LoginPage);
