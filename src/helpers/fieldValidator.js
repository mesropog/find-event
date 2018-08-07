export default class FieldsValidator {

    static validate = state => {
        const newState = {...state};
        newState['hasErrors'] = false;
        for(let key in newState) {
            if(newState[key].value === ''){
                newState[key].error = 'This field is required';
                newState['hasErrors'] = true;
            }
        }
        return newState;
    };

    static isRequired = value => !!value;

    static isStrongPassword = value => {
        if(value){
            const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
            return pattern.test(value);
        }
        return false;
    };

    static isRequiredLength = (value, length) => {
        if (value) {
            return value.length >= length;
        }
        return false;
    };

    static isValidEmail = email => {
        if (email) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(email);
        }
        return false;
    };

    static passwordsAreEqual = (pass1, pass2) => {
        if (pass1 && pass2){
            return pass1 === pass2;
        }
        return false;
    }

}