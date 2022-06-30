export const requiredFields = (values, fields, errors) => {
    fields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
}

export const checkEmail = (values, field, errors) => {
    if (!values[field]) {
        errors[field] = 'Required';
    } else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values[field]))
    {
        errors[field] = 'Invalid email address';
    }
}