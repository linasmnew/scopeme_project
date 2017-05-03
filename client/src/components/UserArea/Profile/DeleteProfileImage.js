import React from 'react';
import classnames from 'classnames';

const DeleteProfileImage = ({ removeAccount }) => {
  return (
    <button className="remove_account_button" onClick={removeAccount}>Delete account</button>
  );
}

export default DeleteProfileImage;
