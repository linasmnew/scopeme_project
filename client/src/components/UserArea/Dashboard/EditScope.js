import React from 'react';
import ScopeForm from './ScopeForm';
import scopeValidation from './scopeValidation';
import { connect } from 'react-redux';
import { fetchScope, addScopeRequest, editScopeRequest } from '../../../actions/scopes';


class ScopeFormComponent extends React.Component {

  state = {
    _id: this.props.scope ? this.props.scope._id : null,
    siteName: this.props.scope ? this.props.scope.siteName : '',
    link: this.props.scope ? this.props.scope.link : '',
    backgroundColor: this.props.scope ? this.props.scope.backgroundColor : '',
    textColor: this.props.scope ? this.props.scope.textColor : '',
    showColor: false,
    scopeSuccessMessage: '',
    errors: {}
  };

  componentDidMount = () => {
    if(this.props.match.params.id) {
      this.props.fetchScope(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id) {
      this.setState({
        _id: nextProps.scope._id,
        siteName: nextProps.scope.siteName,
        link: nextProps.scope.link,
        backgroundColor: nextProps.scope.backgroundColor,
        textColor: nextProps.scope.textColor
      });
    }
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

    const { _id, siteName, link, backgroundColor, textColor } = this.state;
    const { validationErrors, isValid } = scopeValidation({siteName, link, backgroundColor, textColor});

    if(isValid) {
      this.props.editScopeRequest({ _id, siteName, link, backgroundColor, textColor }).then(() => {
        return this.setState({scopeSuccessMessage: 'Scope updated'});
      }).catch(err => {
        if(!err.response) return this.setState({ errors: err.global});
        if(err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
      });
    } else {
      return this.setState({errors: validationErrors});
    }

  }

  showColorToggle = (e) => {
    this.setState({showColor: !this.state.showColor});
  }

  render() {
    return (
      <div className="auth_component_container">
        <ScopeForm buttonMessage={"Save"} state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} showColorToggle={this.showColorToggle} />
      </div>
    );
  }

}


function mapStateToProps(state, props) {
  if(props.match.params.id) {
    return {
      scope: state.scopes.find(scope => scope._id === props.match.params.id)
    };
  }
  //if no scope is found with the id entered in URL
  //set scope to null
  return { scope: null };
}


export default connect(mapStateToProps, { fetchScope, addScopeRequest, editScopeRequest })(ScopeFormComponent);
