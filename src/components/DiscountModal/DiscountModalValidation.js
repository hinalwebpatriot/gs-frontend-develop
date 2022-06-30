import { emailValidation, textInputValidation } from "../../utils/validation";

export default function DiscountModalValidation(data) {
    const { email, first_name, last_name, code } = data;

    const errors = {
        ...emailValidation({ email }),
        ...textInputValidation(
            first_name,
            "first_name",
            "The first name is required"
        ),
        ...textInputValidation(
            last_name,
            "last_name",
            "The first name is required"
        ),
    };

    return {
        errors: errors,
        isValid: !Object.keys(errors).length
    };
}
