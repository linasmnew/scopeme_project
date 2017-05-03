import React from 'react';
import editIcon from '../../../pencil3-lighter.svg';
import binIcon from '../../../bin2-lighter.svg';

const Scope = ({ scope, editScope, removeScope }) => {
  let scopeBackgroundColor = {
    //is scope was created without background option then make it green
    background: scope.backgroundColor || '#099'
  };
  let scopeTextColor = {
    //is scope was created without color option then make it white
    color: scope.textColor || '#fff'
  };

  return (
      <div style={scopeBackgroundColor} className="scope_block">
        <a style={scopeTextColor} target="_blank" href={"http://"+scope.link}>{scope.siteName}</a>
        <div className="scope_buttons_container">
          <button onClick={editScope}><img src={editIcon} alt="edit icon" width="24" height="24" /></button>
          <button onClick={removeScope}><img src={binIcon} alt="delete icon" width="24" height="24" /></button>
        </div>
      </div>
  );

}

export default Scope;
