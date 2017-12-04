import React from 'react';
import classnames from 'classnames';

const ProfileUpdateForm = ({ state, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {!!state.errors.global && <div className="general_form_error"><p>{state.errors.global}</p></div>}
      {!!state.bioUpdateSuccessMessage && <div className="general_form_success"><p>{state.bioUpdateSuccessMessage}</p></div>}

      <div className={classnames({field_error: !!state.errors.fullName})}><p>{state.errors.fullName}</p></div>
      <input type="text" name="fullName" value={state.fullName} onChange={handleChange} placeholder="Full name" />

      <div className={classnames({field_error: !!state.errors.description})}><p>{state.errors.description}</p></div>
      <textarea type="text" name="description" value={state.description} onChange={handleChange} placeholder="Description"></textarea>

      <div className={classnames({field_error: !!state.errors.username})}><p>{state.errors.username}</p></div>
      <input type="text" name="username" value={state.username} onChange={handleChange}  placeholder="Username" />

      <h4>Private Information</h4>

      <div className={classnames({field_error: !!state.errors.email})}><p>{state.errors.email}</p></div>
      <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" />

      <button>Update</button>
    </form>
  );
}

export default ProfileUpdateForm;
