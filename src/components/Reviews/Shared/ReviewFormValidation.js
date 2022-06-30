import {
  emailValidation,
  textInputValidation
} from "../../../utils/validation";

export default function ReviewFormValidation(data) {
  const { name, title, text, email } = data;

  const errors = {
    ...textInputValidation(name, "name", "Name is required"),
    ...textInputValidation(title, "title", "Description is required"),
    ...textInputValidation(text, "text", "Comment is required"),
    ...emailValidation({ email })
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
