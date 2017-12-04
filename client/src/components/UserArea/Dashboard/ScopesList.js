import React from 'react';
import PropTypes from 'prop-types';
import Scope from './Scope';

class ScopesList extends React.Component {
  onClickRemove = (scopeId) => () => {
    this.props.removeScope(scopeId);
  }

  onClickEdit = (scopeId) => () => {
    this.props.history.push(`/edit-scope/${scopeId}`);
  }

  render() {
    const emptyScopes = (<p>You have no scopes in your collection</p>);

    const scopesList = (
      !!this.props.scopes &&
      <div>
        {this.props.scopes.map((scope) => <Scope scope={scope} key={scope._id} editScope={this.onClickEdit(scope._id)} removeScope={this.onClickRemove(scope._id)} />)}
      </div>
    );

    return (
      <div>
        {this.props.scopes.length === 0 ? emptyScopes : scopesList}
      </div>
    );
  }
}

ScopesList.propTypes = {
  scopes: PropTypes.array.isRequired,
};

export default ScopesList;
