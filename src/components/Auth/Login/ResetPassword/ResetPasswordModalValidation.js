import {
  emailValidation,
} from "../../../../utils/validation";

export default function ResetPasswordModalValidation(data) {
  const { email } = data;

  const errors = {
    ...emailValidation({ email })
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
