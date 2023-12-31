// util.js (ou le nom de ton fichier utilitaire)
import { useState } from 'react';

export const useInput = (validators) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validators.every((validator) => validator.validateFn(enteredValue));
    const errorMsg = isTouched ? validators.find((validator) => !validator.validateFn(enteredValue))?.msg : '';

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        enteredValue,
        valueIsValid,
        errorMsg,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};
