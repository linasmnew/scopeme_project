import validator from '../../../public/validator.min.js';

const authValidation = (data) => {
  let validationErrors = {};

  if(!validator.isEmail(data.email)) validationErrors.email = 'Invalid email address provided';

  if(data.password.length < 10) validationErrors.password = "Password must consist of a minimum of 10 characters";
  if(data.password.length > 50) validationErrors.password = "Password exceeds the allowed character limit";

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};

export { authValidation };
