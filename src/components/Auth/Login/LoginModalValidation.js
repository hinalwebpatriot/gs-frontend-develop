import {
  emailValidation,
  textInputValidation
} from "../../../utils/validation";

export default function LoginModalValidation(data) {
  const { password, email } = data;

  const errors = {
    ...textInputValidation(password, "password", "Password required"),
    ...emailValidation({ email })
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
