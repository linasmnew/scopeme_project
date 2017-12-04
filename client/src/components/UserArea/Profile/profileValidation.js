import validator from '../../../../public/validator.min.js';

const profileValidation = (data) => {
  let validationErrors = {};

  //sanitization to normalize input before running it through validation
  validator.trim(data.fullName);
  validator.trim(data.description);
  validator.trim(data.email);
  validator.trim(data.username);

  validator.escape(data.fullName);
  validator.escape(data.description);
  validator.escape(data.username);

  data.username = data.username.toLowerCase();

  //validation
  //only maximum, no minimum because blank is allowed
  if(data.fullName.length > 256) validationErrors.fullName = 'Full name exceeded the character limit';
  if(data.description.length > 2000) validationErrors.fullName = 'Description exceeded the character limit';

  if(!validator.isEmail(data.email)) validationErrors.email = 'Invalid email address provided';

  if(data.username.length < 1) validationErrors.username = "Invalid username";
  if(data.username.length > 30) validationErrors.username = "Username exceeds the allowed character limit of 30";

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};

const passwordChangeValidation = (data) => {
  let validationErrors = {};

  if(data.newPassword !== data.newPasswordConfirm) validationErrors.newPassword = "New passwords do not match";

  //validation
  if(data.oldPassword.length < 10) validationErrors.oldPassword = "Invalid old password";
  if(data.oldPassword.length > 50) validationErrors.oldPassword = "Password exceeds the allowed character limit";

  if(data.newPassword.length < 10) validationErrors.newPassword = "Password must consist of a minimum of 10 characters";
  if(data.newPassword.length > 50) validationErrors.newPassword = "Password exceeds the allowed character limit";

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};

export { profileValidation, passwordChangeValidation };
