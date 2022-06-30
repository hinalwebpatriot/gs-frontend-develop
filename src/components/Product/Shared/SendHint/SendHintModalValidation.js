import {
  emailValidation,
  textInputValidation
} from "../../../../utils/validation";

export default function SendHintModalValidation(data) {
  const { email, senderName, recipientName, message } = data;

  const errors = {
    ...textInputValidation(
      senderName,
      "senderName",
      "The sender name is required"
    ),
    ...textInputValidation(
      recipientName,
      "recipientName",
      "The recipient name is required"
    ),
    ...textInputValidation(message, "message", "The message field is required"),
    ...emailValidation({ email })
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
