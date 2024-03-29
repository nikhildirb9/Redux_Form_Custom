import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import ReduxFormSelect from './ReduxFormSelect';
import { setFormSubmittingFlag, postalCodeLookup, clearCityStateValues, handleReset } from './UserActions';
import { get } from 'lodash';
import { stateList, requiredError, required, email, validUSZipCode, normalizePhone, minLength12 } from './utils';
import { Button, ButtonToolbar } from 'react-bootstrap';

const selector = formValueSelector('userForm');

const onSubmit = (values, dispatch) => {
    //dispatch(saveForm(values));
    dispatch(setFormSubmittingFlag(true));
};

const onSubmitFail = (errors, dispatch) => {
    dispatch(setFormSubmittingFlag(false));
};


export class UserForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting, getCityState, zipCode, clearCityState, disableSubmit, handleReset } = this.props;
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
                                name="phone"
                                component={CustomInput}
                                validate={[required, minLength12]}
                                errorMessages={{
                                    required: requiredError,
                                    invalid: 'Enter valid Phone number',
                                }}
                                label='Phone Number'
                                normalize={normalizePhone}
                            />
                        </div>
                        <div>
                            <Field
                                name="zip"
                                component={CustomInput}
                                validate={[required, validUSZipCode]}
                                errorMessages={{
                                    required: requiredError,
                                    invalid: 'Enter valid zip code',
                                }}
                                label="Zip Code"
                                controlId="zip"
                                onChange={() => { clearCityState(); }}
                                onBlur={() => { getCityState(zipCode); }}
                            />
                        </div>
                        <div>
                            <Field
                                name="city"
                                component={CustomInput}
                                validate={[required]}
                                errorMessages={{
                                    required: required,
                                }}
                                label="City"
                            />
                        </div>
                        <div>
                            <Field
                                name="state"
                                component={ReduxFormSelect}
                                options={stateList}
                                validate={required}
                                errorMessage={requiredError}
                                placeholder="Please select"
                                label='State'
                            />
                        </div>
                    </FormSection>
                    <div>
                        <ButtonToolbar>
                            {disableSubmit && (<Link
                                to="/otherDetails"
                            >
                                Next
                        </Link>)}
                            <Button as="input" type="submit" variant="primary" value="Submit" size="lg" disabled={pristine || submitting}>Submit</Button>
                            <Button as="input" type="reset" variant="secondary" value="Reset" size="lg" disabled={pristine || submitting} onClick={() => { handleReset('userForm') }}>Clear</Button>
                        </ButtonToolbar>
                    </div>
                </form>
            </Fragment>
        ); 
    }
}

const mapStateToProps = (state) => ({
    disableSubmit: get(state, 'user.disableSubmit', false),
    zipCode: selector(state, 'zip'),
});

const mapDispatchToProps = dispatch => ({
    setFormSubmittingFlag: val => dispatch(setFormSubmittingFlag(val)),
    getCityState: val => dispatch(postalCodeLookup(val)),
    clearCityState: () => dispatch(clearCityStateValues()),
    handleReset: (name) => dispatch(handleReset(name)),
});

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'userForm',
    onSubmit,
    onSubmitFail,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(UserForm));

export default UserContainer;

