import { passwordValidation } from "../../../../utils/validation";

export default function ChangePasswordPageValidation(data) {
  const { password, confirmPassword } = data;

  const errors = {
    ...passwordValidation({ password, confirmPassword }),
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
