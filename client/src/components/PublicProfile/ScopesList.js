import React from 'react';
import Scope from './Scope';

const ScopesList = ({scopes}) => {
  const scopesList = (
    <div>
      {scopes.map((scope) => <Scope scope={scope} key={scope._id} />)}
    </div>
  );

  return (
    <div>
      {scopes.length === 0 ? null : scopesList}
    </div>
  );
}

export default ScopesList;
