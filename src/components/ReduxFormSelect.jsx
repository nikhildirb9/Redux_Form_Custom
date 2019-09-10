import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { ControlLabel, HelpBlock } from 'react-bootstrap';
import 'react-select/dist/react-select.css';

const ReduxFormSelect = ({
    label,
    name,
    disabled,
    errorMessage,
    options,
    placeholder,
    input: {
        onBlur,
        onChange,
        onFocus,
        value,
    },
    meta: {
        active,
        error,
        submitFailed,
        touched,
        visited,
    },
}) => (
            <div>
            <ControlLabel>{label}</ControlLabel>
            <div>
                <Select
                    clearable={false}
                    searchable={false}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onBlur={() => { onBlur(option.value) }}
                    onChange={(option) => { onChange(option.value); }}
                    onFocus={onFocus}
                    options={options}
                    placeholder={placeholder}
                />
                </div>
                {!active && !disabled && touched && error &&
                    <HelpBlock>{errorMessage}</HelpBlock>
                }
            </div>
    );

ReduxFormSelect.defaultProps = {
    label: '',
    name: '',
    disabled: false,
    errorMessage: '',
};

ReduxFormSelect.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    //options: PropTypes.arrayOf(PropTypes.shape({
    //    value: PropTypes.oneOfType([
    //        PropTypes.string,
    //        PropTypes.number,
    //    ]),
    //})).isRequired,
    errorMessage: PropTypes.string,
};

export default ReduxFormSelect;
