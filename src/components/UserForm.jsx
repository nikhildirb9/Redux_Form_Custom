import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
        <form onSubmit={handleSubmit}>
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
                <label>Sex</label>
                <div>
                    <label>
                        <Field name="sex" component="input" type="radio" value="male" />
                        {' '}
                        Male
          </label>
                    <label>
                        <Field name="sex" component="input" type="radio" value="female" />
                        {' '}
                        Female
          </label>
                </div>
            </div>
            <div>
                <label>Favorite Color</label>
                <div>
                    <Field name="favoriteColor" component="select">
                        <option />
                        <option value="ff0000">Red</option>
                        <option value="00ff00">Green</option>
                        <option value="0000ff">Blue</option>
                    </Field>
                </div>
            </div>
            <div>
                <label htmlFor="employed">Employed</label>
                <div>
                    <Field
                        name="employed"
                        id="employed"
                        component="input"
                        type="checkbox"
                    />
                </div>
            </div>
            <div>
                <label>Notes</label>
                <div>
                    <Field name="notes" component="textarea" />
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
        </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'userForm', // a unique identifier for this form
})(UserForm);
