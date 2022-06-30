import {
  textInputValidation,
  textRangeValidation
} from "../../../../../utils/validation";

export default function PaymentMethodAdyenValidation(data) {
  const { cardHolder, cardNumber, year, month, cvc } = data;

  const errors = {
    ...textInputValidation(cardHolder, 'cardHolder', "Card owner required"),
    ...textInputValidation(cardNumber, 'cardNumber', "Card number required"),
    ...textRangeValidation({
      value: year,
      label: 'Year',
      field: 'year',
      exact: 4
    }),
    ...textRangeValidation({
      value: month,
      label: 'Month',
      field: 'month',
      exact: 2
    }),
    ...textRangeValidation({
      value: cvc,
      label: 'CVC',
      field: 'cvc',
      min: 3,
      max: 4
    }),
  };

  return {
    errors: errors,
    isValid: !Object.keys(errors).length
  };
}
