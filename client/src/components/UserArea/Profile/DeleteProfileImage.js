import React from 'react';

const DeleteProfileImage = ({ removeAccount }) => {
  return (
    <button className="remove_account_button" onClick={removeAccount}>Delete account</button>
  );
}

export default DeleteProfileImage;
