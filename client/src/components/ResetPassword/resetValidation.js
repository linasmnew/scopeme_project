import validator from '../../../public/validator.min.js';


const emailValidation = (data) => {
  let validationErrors = {};

  validator.trim(data.email);
  if(!validator.isEmail(data.email)) validationErrors.email = 'Invalid email address provided';

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};


const passwordCreateValidation = (data) => {
  let validationErrors = {};

  if(data.newPassword !== data.newPasswordConfirm) validationErrors.newPasswordConfirm = "Passwords do not match";

  /* TODO: check if pass only consists of legit characters */

  //validation
  if(data.newPassword.length < 10) validationErrors.newPassword = "Password must consist of a minimum of 10 characters";
  if(data.newPassword.length > 50) validationErrors.newPassword = "Password exceeds the allowed character limit";

  if(data.newPasswordConfirm.length < 10) validationErrors.newPasswordConfirm = "Password must consist of a minimum of 10 characters";
  if(data.newPasswordConfirm.length > 50) validationErrors.newPasswordConfirm = "Password exceeds the allowed character limit";

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};




export { passwordCreateValidation, emailValidation };
