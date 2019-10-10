import React from 'react';
import { HelpBlock, ControlLabel } from 'react-bootstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import 'react-widgets/dist/css/react-widgets.css';


import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

momentLocalizer(moment);

const ReduxDateTimePicker = ({
    label,
    alt,
    showTime,
    disabled,
    errorMessage,
    dateFormat,
    input: {
        name,
        value,
        onChange,
        onBlur,
        onFocus,
        onKeyDown,
    },
    meta: {
        error,
        submitFailed,
        touched,
        visited,
    },
}) => (
        <div>
            <ControlLabel>{label}</ControlLabel>
            <DateTimePicker
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                format={dateFormat}
                time={showTime}
                value={!value ? null : new Date(value)}
            />
            {!disabled && touched && error &&
                <HelpBlock>{errorMessage}</HelpBlock>
            }
        </div>
    );

ReduxDateTimePicker.defaultProps = {
    label: '',
    labelClass: '',
    selectClass: '',
    name: '',
    disabled: false,
    errorMessage: '',
};

export default ReduxDateTimePicker;
