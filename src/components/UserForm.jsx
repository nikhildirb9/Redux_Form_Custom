import React, { Fragment } from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import CustomInput from './CustomInput';
import ReduxFormSelect from './ReduxFormSelect';
import validator from 'validator';

const requiredError = "Please Enter Required Filed";

const stateList =
    [
        {
            label: 'Alabama',
            value: 'AL',
        },
        {
            label: 'Alaska',
            value: 'AK',
        },
        {
            label: 'Arizona',
            value: 'AZ',
        },
        {
            label: 'Arkansas',
            value: 'AR',
        },
        {
            label: 'California',
            value: 'CA',
        },
        {
            label: 'Colorado',
            value: 'CO',
        },
        {
            label: 'Connecticut',
            value: 'CT',
        },
        {
            label: 'Delaware',
            value: 'DE',
        },
        {
            label: 'Florida',
            value: 'FL',
        },
        {
            label: 'Georgia',
            value: 'GA',
        },
        {
            label: 'Hawaii',
            value: 'HI',
        },
        {
            label: 'Idaho',
            value: 'ID',
        },
        {
            label: 'Illinois',
            value: 'IL',
        },
        {
            label: 'Indiana',
            value: 'IN',
        },
        {
            label: 'Iowa',
            value: 'IA',
        },
        {
            label: 'Kansas',
            value: 'KS',
        },
        {
            label: 'Kentucky',
            value: 'KY',
        },
        {
            label: 'Louisiana',
            value: 'LA',
        },
        {
            label: 'Maine',
            value: 'ME',
        },
        {
            label: 'Maryland',
            value: 'MD',
        },
        {
            label: 'Massachusetts',
            value: 'MA',
        },
        {
            label: 'Michigan',
            value: 'MI',
        },
        {
            label: 'Minnesota',
            value: 'MN',
        },
        {
            label: 'Mississippi',
            value: 'MS',
        },
        {
            label: 'Missouri',
            value: 'MO',
        },
        {
            label: 'Montana',
            value: 'MT',
        },
        {
            label: 'Nebraska',
            value: 'NE',
        },
        {
            label: 'Nevada',
            value: 'NV',
        },
        {
            label: 'New Hampshire',
            value: 'NH',
        },
        {
            label: 'New Jersey',
            value: 'NJ',
        },
        {
            label: 'New Mexico',
            value: 'NM',
        },
        {
            label: 'New York',
            value: 'NY',
        },
        {
            label: 'North Carolina',
            value: 'NC',
        },
        {
            label: 'North Dakota',
            value: 'ND',
        },
        {
            label: 'Ohio',
            value: 'OH',
        },
        {
            label: 'Oklahoma',
            value: 'OK',
        },
        {
            label: 'Oregon',
            value: 'OR',
        },
        {
            label: 'Pennsylvania',
            value: 'PA',
        },
        {
            label: 'Rhode Island',
            value: 'RI',
        },
        {
            label: 'South Carolina',
            value: 'SC',
        },
        {
            label: 'South Dakota',
            value: 'SD',
        },
        {
            label: 'Tennessee',
            value: 'TN',
        },
        {
            label: 'Texas',
            value: 'TX',
        },
        {
            label: 'Utah',
            value: 'UT',
        },
        {
            label: 'Vermont',
            value: 'VT',
        },
        {
            label: 'Virginia',
            value: 'VA',
        },
        {
            label: 'Washington',
            value: 'WA',
        },
        {
            label: 'West Virginia',
            value: 'WV',
        },
        {
            label: 'Wisconsin',
            value: 'WI',
        },
        {
            label: 'Wyoming',
            value: 'WY',
        }
    ];

const required = (value) => {
    if (value === undefined || value === '' || value === null) {
        return 'required';
    }
    return undefined;
};

const email = value =>
    (value && !validator.isEmail(value)
        ? 'invalid'
        : undefined);

const UserForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <Fragment>
        <form onSubmit={handleSubmit}>
            <FormSection>
                <div>
                    <Field
                        label="First Name"
                        name="firstName"
                        component={CustomInput}
                        validate={[required]}
                        errorMessages={{
                            required: requiredError,
                        }}
                    />
                </div>
                <div>
                    <Field
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        component={CustomInput}
                        validate={[required]}
                        errorMessages={{
                            required: requiredError,
                        }}
                    />
                </div>
                <div>
                    <Field
                        label="Email"
                        name="email"
                        component={CustomInput}
                        type="email"
                        validate={[required, email]}
                        errorMessages={{
                            required: requiredError,
                            invalid: 'Please enter valid email',
                        }}
                    />
                    </div>
                 <div>
                      <Field
                            name="states"
                            component={ReduxFormSelect}
                            options={stateList}
                            validate={required}
                            errorMessage={requiredError}
                            placeholder="Please select"
                            label="State"
                       />
                    </div>
            </FormSection>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
            </form>
            </Fragment>
    );
};

export default reduxForm({
    form: 'userForm', // a unique identifier for this form
})(UserForm);
