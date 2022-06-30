import { passwordValidation, emailValidation } from "../../../utils/validation";

export default function SignUpModalValidation(data) {
  const { password, confirmPassword, email } = data;

  const errors = {
    ...passwordValidation({ password, confirmPassword }),
    ...emailValidation({ email })
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
