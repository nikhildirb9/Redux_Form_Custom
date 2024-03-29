import React from 'react';
import Checkbox from './Checkbox';
import { HelpBlock } from 'react-bootstrap';

const ReduxFormCheckbox = ({
    label,
    alt,
    labelClass,
    checked,
    disabled,
    errorMessage,
    input: {
        name,
        value,
        onChange,
    },
    meta: {
        error,
        submitFailed,
        touched,
        visited,
    },
}) => (
        <div>
            <Checkbox
                label={label}
                alt={alt}
                labelClass={labelClass}
                value={name}
                checked={!!value}
                disabled={disabled}
                onChange={onChange}
            />
            {!disabled && touched && error &&
                <HelpBlock>{errorMessage}</HelpBlock>
            }
        </div>
    );

ReduxFormCheckbox.defaultProps = {
    label: '',
    labelClass: '',
    selectClass: '',
    name: '',
    disabled: false,
    errorMessage: '',
};

export default ReduxFormCheckbox;
