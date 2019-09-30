import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

const getValidationState = (value, active, touched, error) => {
    if (!active) {
        if (value && !error) {
            return 'success';
        }
        if (touched && error) {
            return 'error';
        }
    }
    return null;
};

const getErrorMessage = (errorMessages, errorKey) => {
    const errorDescription = errorMessages[errorKey];
    return errorDescription || 'Error';
};

const CustomInput = ({
    controlId,
    label,
    errorMessages,
    disabled,
    input: {
        onBlur,
        onChange,
        onFocus,
        onKeyDown,
        name,
        value,
    },
    meta: {
        active,
        error,
        touched,
    },
}) => (
        <FormGroup
            controlId={controlId}
            bsClass="custom-form-field"
            validationState={getValidationState(value, active, touched, error)}
        >
            <div>
                <ControlLabel>{label}</ControlLabel>
            </div>
            <FormControl
                type="text"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                value={value}
                disabled={disabled}
            />
            <FormControl.Feedback />
            {touched && error &&
                <HelpBlock>{getErrorMessage(errorMessages, error)}</HelpBlock>
            }
   
        </FormGroup>
    );

export default CustomInput;
