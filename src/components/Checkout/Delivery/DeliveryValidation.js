import {
  emailValidation,
  textInputValidation,
  phoneValidation
} from "../../../utils/validation";

export function showroomDeliveryValidation(data) {
  const { email } = data.shared;
  const { firstName, lastName, phoneNumber } = data.showroom;

  const shared = {
    ...emailValidation({ email })
  };

  const showroom = {
    ...textInputValidation(
      firstName,
      "firstName",
      "Showroom: The first name is required"
    ),
    ...textInputValidation(
      lastName,
      "lastName",
      "Showroom: The last name is required"
    ),
    ...phoneValidation(phoneNumber, "phoneNumber", {
      required: "Showroom: The phone number is required",
      info: `Showroom: Write correct phone. Example: "+61 491 570 156"`
    })
  };

  const errors = {
    shared: shared,
    office: {},
    home: {},
    showroom: showroom
  };

  const globalIsValid = Object.keys(errors).every(
    key => Object.keys(errors[key]).length === 0
  );

  const isValid = {
    office: "none",
    home: "none",
    showroom: globalIsValid,
    global: globalIsValid
  };

  return {
    errors,
    isValid
  };
}

export function officeDeliveryValidation(data) {
  const { email } = data.shared;
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    country,
    phoneNumber
  } = data.office;

  const shared = {
    ...emailValidation({ email })
  };

  const office = {
    ...textInputValidation(
      firstName,
      "firstName",
      "Office: The first name is required"
    ),
    ...textInputValidation(
      lastName,
      "lastName",
      "Office: The last name is required"
    ),
    ...textInputValidation(
      address,
      "address",
      "Office: The address is required"
    ),
    ...textInputValidation(city, "city", "Office: The city is required"),
    ...textInputValidation(
      country,
      "country",
      "Office: The country is required"
    ),
    ...textInputValidation(
      postalCode,
      "postalCode",
      "Office: The postal code is required"
    ),
    ...phoneValidation(phoneNumber, "phoneNumber", {
      required: "Office: The phone number is required",
      info: `Office: Write correct phone. Example: "+61 491 570 156"`
    })
  };

  const errors = {
    shared: shared,
    office: office,
    home: {},
    showroom: {}
  };

  const globalIsValid = Object.keys(errors).every(
    key => Object.keys(errors[key]).length === 0
  );

  const isValid = {
    office: globalIsValid,
    home: "none",
    showroom: "none",
    global: globalIsValid
  };
  return {
    errors,
    isValid
  };
}

export function officeAndHomeDeliveryValidation(data) {
  const { home, office, shared } = data;

  const sharedVal = {
    ...emailValidation({ email: shared.email })
  };

  const officeVal = {
    ...textInputValidation(
      office.firstName,
      "firstName",
      "Office: The first name is required"
    ),
    ...textInputValidation(
      office.lastName,
      "lastName",
      "Office: The last name is required"
    ),
    ...textInputValidation(
      office.address,
      "address",
      "Office: The address is required"
    ),
    ...textInputValidation(office.city, "city", "Office: The city is required"),
    ...textInputValidation(
      office.country,
      "country",
      "Office: The country is required"
    ),
    ...textInputValidation(
      office.postalCode,
      "postalCode",
      "Office: The postal code is required"
    ),
    ...phoneValidation(office.phoneNumber, "phoneNumber", {
      required: "Office: The phone number is required",
      info: `Office: Write correct phone. Example: "+61 491 570 156"`
    })
  };

  const homeVal = {
    ...textInputValidation(
      home.firstName,
      "firstName",
      "Home: The first name is required"
    ),
    ...textInputValidation(
      home.lastName,
      "lastName",
      "Home: The last name is required"
    ),
    ...textInputValidation(
      home.address,
      "address",
      "Home: The address is required"
    ),
    ...textInputValidation(
      home.buildingNumber,
      "buildingNumber",
      "Home: The building number is required"
    ),
    ...textInputValidation(home.city, "city", "Home: The city is required"),
    ...textInputValidation(
      home.country,
      "country",
      "Home: The country is required"
    ),
    ...textInputValidation(
      home.postalCode,
      "postalCode",
      "Home: The postal code is required"
    ),
    ...phoneValidation(home.phoneNumber, "phoneNumber", {
      required: "Home: The phone number is required",
      info: `Home: Write correct phone. Example: "+61 491 570 156"`
    })
  };

  const errors = {
    shared: sharedVal,
    office: officeVal,
    home: homeVal,
    showroom: {}
  };

  const globalIsValid = Object.keys(errors).every(
    key => Object.keys(errors[key]).length === 0
  );

  const isValid = {
    office: globalIsValid,
    home: globalIsValid,
    showroom: "none",
    global: globalIsValid
  };

  return {
    errors,
    isValid
  };
}
