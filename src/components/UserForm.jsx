import React, { Fragment } from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import CustomInput from './CustomInput';
import validator from 'validator';

const requiredError = "Please Enter Required Filed";

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
