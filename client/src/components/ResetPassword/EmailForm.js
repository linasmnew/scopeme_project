import React from 'react';
import classnames from 'classnames';

const EmailForm = ({ state, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!!state.errors.global && <div className="general_form_error"><p>{state.errors.global}</p></div>}
        {!!state.emailSuccessMessage && <div className="general_form_success"><p>{state.emailSuccessMessage}</p></div>}

        <div className={classnames({field_error: !!state.errors.email})}><p>{state.errors.email}</p></div>
        <input type="text" name="email" value={state.email} onChange={handleChange} placeholder="Email" />

        <button>Submit</button>
      </form>
      <p className="authentication_info_p">A reset link will be sent to your email address</p>
    </div>
  );
}

export default EmailForm;
