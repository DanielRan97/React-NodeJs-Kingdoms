export const checkFormsValidations = (value, rule) => {

    let isValid = true;

    if(!rule){
        return isValid;
    }

    if(rule.requierd){
        isValid = value.trim() !== '' && isValid;
    }

    if(rule.email){
        const mailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = value.match(mailValidation) && isValid;
    }

    if(rule.lettersOnly){
        const checkIflettersOnly =  /\d/;
        isValid = !value.match(checkIflettersOnly) && isValid;
    }

    if(rule.minLength){
        isValid = value.length >= rule.minLength && isValid;
    }

    if(rule.maxLength){
        isValid = value.length <= rule.maxLength && isValid;
    }
    return isValid;

};