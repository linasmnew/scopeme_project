import React from 'react';
import Scope from './Scope';

const ScopesList = ({scopes}) => {
  const scopesList = (
    <div>
      {scopes.map((scope, index) => <Scope scope={scope} key={index} />)}
    </div>
  );

  return (
    <div>
      {scopes.length === 0 ? null : scopesList}
    </div>
  );
}

export default ScopesList;
