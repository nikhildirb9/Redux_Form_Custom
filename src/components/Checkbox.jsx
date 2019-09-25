import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
    label, labelClass, value, checked, disabled, onChange,
}) => (
        <label className={`checkbox ${disabled ? 'checkbox-disabled' : ''}`} htmlFor={value}>
            <input
                type="checkbox"
                id={value}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <span className={`custom-checkbox ${label ? 'custom-checkbox-label' : ''}`}>
                <span className={labelClass}>{label}</span>
            </span>
        </label>
    );

Checkbox.defaultProps = {
    label: '',
    labelClass: 'default-checkbox-label',
    value: '',
    checked: false,
    disabled: false,
    onChange: () => false,
};

Checkbox.propTypes = {
    label: PropTypes.node,
    labelClass: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Checkbox;
