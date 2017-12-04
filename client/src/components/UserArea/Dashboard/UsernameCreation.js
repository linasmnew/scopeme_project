import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { updateUsernameRequest } from '../../../actions/createUsername';

class UsernameCreation extends React.Component {
  state = {
    username: '',
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
    this.props.updateUsernameRequest({username: this.state.username}).then(() => {
      this.props.history.replace('/dashboard');
    }).catch(err => {
      //if can't reach server
      if(!err.response) return this.setState({ errors: err.global});
      //if custom error from server
      if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
    });
  }

  render() {
    return (
      <div className="guest_component_container">
        <form onSubmit={this.handleSubmit}>
          {!!this.state.errors.global && <div className="general_form_error"><p>{this.state.errors.global}</p></div>}

          <div className={classnames({field_error: !!this.state.errors.username})}><p>{this.state.errors.username}</p></div>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}  placeholder="Username" />

          <button>Submit</button>
        </form>
        <p className="authentication_info_p">Username can be changed later</p>
      </div>
    );
  }

}

UsernameCreation.contextTypes = {
  router: PropTypes.object
}

export default connect(null, { updateUsernameRequest })(UsernameCreation);
