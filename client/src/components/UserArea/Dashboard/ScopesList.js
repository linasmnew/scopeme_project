import React from 'react';
import Scope from './Scope';

class ScopesList extends React.Component {

  onClickRemove(scopeId) {
    this.props.removeScope(scopeId);
  }

  onClickEdit(scopeId) {
    return this.context.router.push(`/edit-scope/${scopeId}`);
  }


  render() {
    const emptyScopes = (<p>You have no scopes in your collection</p>);

    const scopesList = (
      !!this.props.scopes &&
      <div>
        {this.props.scopes.map((scope, index) => <Scope scope={scope} key={index} editScope={() => this.onClickEdit(scope._id)} removeScope={() => this.onClickRemove(scope._id)} />)}
      </div>
    );

    return (
      <div>
        {this.props.scopes.length === 0 ? emptyScopes : scopesList}
      </div>
    );
  }

}


ScopesList.contextTypes = {
  router: React.PropTypes.object.isRequired
}


ScopesList.propTypes = {
  scopes: React.PropTypes.array.isRequired,
};

export default ScopesList;
