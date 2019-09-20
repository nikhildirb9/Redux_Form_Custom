import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({
    id, label, value, checked, disabled, groupName, onChange,
}) => (
        <label htmlFor={id}>
            <input
                type="radio"
                id={id}
                value={value}
                checked={checked}
                disabled={disabled}
                name={groupName}
                onChange={() => onChange(value)}
            />
            <span>
                <span>{label}</span>
            </span>
        </label>
    );

RadioButton.defaultProps = {
    id: '',
    label: '',
    value: '',
    checked: false,
    disabled: false,
    groupName: '',
    onChange: () => false,
};

RadioButton.propTypes = {
    id: PropTypes.string,
    label: PropTypes.node,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    groupName: PropTypes.string,
    onChange: PropTypes.func,
};

export default RadioButton;
