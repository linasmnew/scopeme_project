import React from 'react';
import classnames from 'classnames';
import plusIcon from '../../../plus.svg';

const ScopeForm = ({ state, handleChange, handleSubmit, showColorToggle, buttonMessage }) => {

  let scopeBackgroundColor = {
    background: state.backgroundColor || '#f2f2f2'
  };
  let scopeTextColor = {
    background: state.backgroundColor || '#f2f2f2',
    color: state.textColor || '#000'
  };

  return (
    <div className="scope_form_container">
      <form onSubmit={handleSubmit}>
        {!!state.errors.global && <div className="general_form_error"><p>{state.errors.global}</p></div>}
        {!!state.scopeSuccessMessage && <div className="general_form_success"><p>{state.scopeSuccessMessage}</p></div>}

        <div className={classnames({field_error: !!state.errors.siteName})}><p>{state.errors.siteName}</p></div>
        <input type="text" name="siteName" value={state.siteName} onChange={handleChange}  placeholder="Website name" />

        <div className={classnames({field_error: !!state.errors.link})}><p>{state.errors.link}</p></div>
        <input type="text" name="link" value={state.link} onChange={handleChange} placeholder="Link to page" />

        <div className="optional_color_icon_container" onClick={showColorToggle}>
          <img src={plusIcon} alt="menu icon" width="16" height="16" />
          <p>Add color (optional)</p>
        </div>

        <div className={classnames('scope_color_inputs_wrapper', {show: state.showColor, hide: !state.showColor})} >
          <div className={classnames({field_error: !!state.errors.backgroundColor})}><p>{state.errors.backgroundColor}</p></div>
          <input style={scopeBackgroundColor} type="text" name="backgroundColor" value={state.backgroundColor} onChange={handleChange} placeholder="Enter background color code" />

          <div className={classnames({field_error: !!state.errors.textColor})}><p>{state.errors.textColor}</p></div>
          <input style={scopeTextColor} type="text" name="textColor" value={state.textColor} onChange={handleChange} placeholder="Enter text color code" />
        </div>

        <button>{buttonMessage}</button>
      </form>
    </div>

  );

}

export default ScopeForm;
