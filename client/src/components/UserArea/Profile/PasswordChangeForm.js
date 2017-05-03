import React from 'react';
import classnames from 'classnames';

const PasswordChangeForm = ({ state, handleChange, handleSubmit }) => {
  const fakePasswordToAvoidBrowserRemembered = {
    display: 'none'
  };
  return (
    <form onSubmit={handleSubmit}>
      {!!state.errors.global && <div className="general_form_error"><p>{state.errors.global}</p></div>}
      {!!state.passwordUpdateSuccessMessage && <div className="general_form_success"><p>{state.passwordUpdateSuccessMessage}</p></div>}

      <input style={fakePasswordToAvoidBrowserRemembered} type="password" name="fake" />

      <div className={classnames({field_error: !!state.errors.oldPassword})}><p>{state.errors.oldPassword}</p></div>
      <input type="password" name="oldPassword" value={state.oldPassword} onChange={handleChange} placeholder="Old password" />

      <div className={classnames({field_error: !!state.errors.newPassword})}><p>{state.errors.newPassword}</p></div>
      <input type="password" name="newPassword" value={state.newPassword} onChange={handleChange} placeholder="New password" />

      <div className={classnames({field_error: !!state.errors.newPasswordConfirm})}><p>{state.errors.newPasswordConfirm}</p></div>
      <input type="password" name="newPasswordConfirm" value={state.newPasswordConfirm} onChange={handleChange} placeholder="Confirm new password" />

      <button>Change password</button>
    </form>

  );

}

export default PasswordChangeForm;
