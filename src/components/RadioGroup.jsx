import React from 'react';
import { HelpBlock } from 'react-bootstrap';
import RadioButton from './RadioButton';

const getRadioButton = ({
    radioButton, groupName, value, onChange,
}) =>
    (<RadioButton
        key={radioButton.id}
        id={radioButton.id}
        label={radioButton.label}
        groupName={groupName}
        value={radioButton.value}
        onChange={onChange}
        checked={value === radioButton.value}
        disabled={radioButton.disabled}
    />);

const RadioGroup = ({
    vertical = true,
    label,
    groupName,
    radioButtons,
    errorMessage,
    input: {
        onChange,
        value,
    },
    meta: {
        error,
        touched,
    },
}) => (
        <div>
            <div>{label}</div>
            {radioButtons && radioButtons.map(radioButton => (
                vertical ?
                    <div key={radioButton.id}>
                        {getRadioButton({
                            radioButton, groupName, value, onChange,
                        })}
                    </div>
                    :
                    getRadioButton({
                        radioButton, groupName, value, onChange,
                    })
            ))}
            {touched && error &&
                <HelpBlock>{errorMessage}</HelpBlock>
            }
        </div>
    );

export default RadioGroup;
