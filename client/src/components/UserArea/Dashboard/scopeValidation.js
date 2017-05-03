import validator from '../../../../public/validator.min.js';

const isRgb = (color) => {
  let matcher = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d\.]+)?\s*\)$/;
  return matcher.test(color);
}

const scopeValidation = (data) => {
  let validationErrors = {};

  //sanitization to normalize input before running it through validation
  validator.trim(data.siteName);
  validator.trim(data.backgroundColor);
  validator.trim(data.textColor);
  validator.trim(data.link);
  validator.escape(data.siteName);

  //validation
  if(data.siteName.length > 24) validationErrors.siteName = 'Site name exceeded 24 characters';
  if(!validator.isURL(data.link)) validationErrors.link = 'Invalid site url'
  //else we just use default color client side
  if(data.backgroundColor !== '') {
    if(!validator.isHexColor(data.backgroundColor) && !isRgb(data.backgroundColor)) {
      validationErrors.backgroundColor = 'Invalid color code';
    }
  }
  if(data.textColor !== '') {
    if(!validator.isHexColor(data.textColor) && !isRgb(data.textColor)) {
      validationErrors.textColor = 'Invalid color code';
    }
  }

  if(validator.isEmpty(data.siteName)) validationErrors.siteName = 'Please enter a site name';
  if(validator.isEmpty(data.link)) validationErrors.link = 'Please enter link';

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};

export default scopeValidation;
