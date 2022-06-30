export const textInputValidation = (str, field, message) => {
  let errors = {};

  if (!str.length) {
    errors[field] = message;
  }

  return errors;
};

export const textRangeValidation = ({value, field, min = 1, max = 255, label, messages = {}, exact}) => {
  const {
    min_m = `${label || field} must be more than ${min} char${min === 1 ? '' : 's'}`,
    max_m = `${label || field} must be less than ${max} char${max === 1 ? '' : 's'}`,
    exact_m = `${label || field} must be exact ${exact} char${exact === 1 ? '' : 's'}`,
    required = `${label || field} required`,
  } = messages;

  let errors = {};
  const length = value.length;

  if (!length) {
    errors[field] = required;
  } else if (exact && length !== exact) {
    errors[field] = exact_m;
  } else if (length < min) {
    errors[field] = min_m;
  } else if (length > max) {
    errors[field] = max_m;
  }

  return errors;
};

export const phoneValidation = (phone, field = "phone", messages = {}) => {
  const {
    required = "Phone is required",
    info = `Write correct phone`
    // info = `Write correct phone. Example: "+61 491 570 156"`
  } = messages;

  let errors = {};

  if (!phone.length) {
    errors[field] = required;
  }

  if (isNaN(Number(phone.replace(/[ -+]/g, '')))) {
    errors[field] = info;
  }

  return errors;
};

// export const phoneValidation = (phone, field = "phone", messages = {}) => {
//   const {
//     required = "Phone is required",
//     info = `Write correct phone. Example: "+61 491 570 156"`
//   } = messages;
//
//   let errors = {};
//
//   if (!phone.length) {
//     errors[field] = required;
//   } else {
//     try {
//       const parsedNumber = parsePhoneNumber(phone);
//       if (!parsedNumber.isValid()) {
//         errors[field] = info;
//       }
//     } catch (e) {
//       errors[field] = info;
//     }
//   }
//
//   return errors;
// };

export const emailValidation = (data, messages = {}) => {
  const {
    required = "Email is required",
    info = "Write correct email"
  } = messages;
  let errors = {};

  data.email = data.email.trim();

  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data.email.length) {
    errors.email = required;
  } else if (!re.test(data.email.toLowerCase())) {
    errors.email = info;
  }
  return errors;
};

export const passwordValidation = (data, messages = {}) => {
  //data is object -> data = {password: '1234', confirmPassword: '1234'}
  const {
    required = "Password field is required",
    info = "Password must be at least 6 characters long",
    // info = 'Password must be at least 8 characters long and include uppercase and lowercase letters and numbers',
    match = "Passwords didn't match"
  } = messages;
  let errors = {};
  // let regExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  if (!data.password.length) {
    errors.password = required;
  } else if (data.password.length < 6) {
    errors.password = info;
  }

  if (typeof data.confirmPassword === "undefined") {
    return errors;
  }

  if (!data.confirmPassword.length) {
    errors.confirmPassword = "Confirm password field required";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = match;
  }

  return errors;
};

export const rateValidation = (rate, messages = {}) => {
  const { info = "Rate must be greater than zero" } = messages;
  let errors = {};
  // let regExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  if (!rate) {
    errors.password = info;
  }

  return errors;
};

// export const checkBoxValidation = (checked, field, message) => {
//   let errors = {};
//
//   if (!checked) {
//     errors[field] = message;
//   }
//
//   return errors;
// };
