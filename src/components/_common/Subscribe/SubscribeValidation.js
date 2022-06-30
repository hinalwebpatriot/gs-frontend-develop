import {
  emailValidation  
} from "../../../utils/validation";

export default function subscribeValidation(data) {
  const { email } = data;

  const errors = {
    ...emailValidation({ email: email })
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
