import React from 'react';
import { HelpBlock } from 'react-bootstrap';
import classNames from 'classnames';
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
    className,
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
        <div className={classNames(
            className,
            { 'inline-radio-buttons': !vertical },
        )}
        >
            <div>{label}</div>
            {radioButtons && radioButtons.map(radioButton => (
                vertical ?
                    <div key={radioButton.id} className="olb-margin-medium">
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
