import React from 'react';
import scopeValidation from './scopeValidation';
import ScopeForm from './ScopeForm';

const initialState = {
  siteName: '',
  link: '',
  backgroundColor: '',
  textColor: '',
  showColor: false,
  errors: {}
};

class AddNewScope extends React.Component {
  state = initialState;

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

    const { siteName, link, backgroundColor, textColor } = this.state;
    const { validationErrors, isValid } = scopeValidation({siteName, link, backgroundColor, textColor});

    if(isValid) {
      this.props.addScopeRequest({siteName, link, backgroundColor, textColor}).catch(err => {
        //if can't reach server
        if(!err.response) return this.setState({ errors: err.global});
        //if custom error from server
        if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
      });
      this.setState(initialState);
    } else {
      this.setState({errors: validationErrors});
    }

  }

  showColorToggle = (e) => {
    this.setState({showColor: !this.state.showColor});
  }

  render() {
    return (
      <ScopeForm buttonMessage={"Add scope"} state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} showColorToggle={this.showColorToggle} />
    );
  }


}

export default AddNewScope;
