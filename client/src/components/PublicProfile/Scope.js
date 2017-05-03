import React from 'react';

const Scope = ({ scope }) => {

  let scopeBackgroundColor = {
    //if scope was created without background option then make it green
    background: scope.backgroundColor || '#099'
  };
  let scopeTextColor = {
    //if scope was created without color option then make it white
    color: scope.textColor || '#fff'
  };

    return (
      <div style={scopeBackgroundColor} className="scope_block">
        <a style={scopeTextColor} target="_blank" href={"http://"+scope.link}>{scope.siteName}</a>
      </div>
    );
}

export default Scope;
