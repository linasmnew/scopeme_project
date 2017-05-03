import React from 'react';
import classnames from 'classnames';

const NewPasswordForm = ({ state, handleChange, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
      {!!state.errors.global && <div className="general_form_error"><p>{state.errors.global}</p></div>}
      {!!state.passwordSuccessMessage && <div className="general_form_success"><p>{state.passwordSuccessMessage}</p></div>}

      <div className={classnames({field_error: !!state.errors.newPassword})}><p>{state.errors.newPassword}</p></div>
      <input type="password" name="newPassword" value={state.newPassword} onChange={handleChange} placeholder="New password" />

      <div className={classnames({field_error: !!state.errors.newPasswordConfirm})}><p>{state.errors.newPasswordConfirm}</p></div>
      <input type="password" name="newPasswordConfirm" value={state.newPasswordConfirm} onChange={handleChange} placeholder="Confirm new password" />

      <button>Create new password</button>
    </form>

  );

}

export default NewPasswordForm;
