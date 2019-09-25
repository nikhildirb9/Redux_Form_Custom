import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import ReduxFormSelect from './ReduxFormSelect';
import RadioGroup from './RadioGroup';
import { saveForm, setFormSubmittingFlag, handleReset, onProductTypeChange } from './UserActions';
import { get } from 'lodash';
import { productList, requiredError, required, formatCurrency, normalizeAmount, productSizes } from './utils';
import { Button, ButtonToolbar, ControlLabel } from 'react-bootstrap';

const selector = formValueSelector('otherDetailsForm');

const onSubmit = (values, dispatch) => {
    dispatch(saveForm());
};

const onSubmitFail = (errors, dispatch) => {
    dispatch(setFormSubmittingFlag(false));
};


export class OtherDetailsForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting, disableSubmit, handleReset, productType, productSize } = this.props;
        return (
            <Fragment>
                <form onSubmit={handleSubmit}>
                    <FormSection>
                        
                        <div>
                            <Field
                                label="Name of Store"
                                name="storeName"
                                placeholder="Store Name"
                                component={CustomInput}
                                validate={[required]}
                                errorMessages={{
                                    required: requiredError,
                                }}
                            />
                        </div>
                        <div>
                            <ControlLabel>
                                Registered Store
                            </ControlLabel>
                            <Field
                                name="registeredStore"
                                component={RadioGroup}
                                vertical={false}
                                radioButtons={[
                                    {
                                        id: `yes`,
                                        label: 'Yes',
                                        value: 'yes',
                                    },
                                    {
                                        id: `no`,
                                        label: 'No',
                                        value: 'no',
                                    },
                                ]}
                                validate={required}
                                errorMessage={requiredError}
                            />
                        </div>
                        <div>
                            <Field
                                label="Purchase Price"
                                name="purchasePrice"
                                component={CustomInput}
                                validate={[required]}
                                errorMessages={{
                                    required: requiredError,
                                }}
                                format={formatCurrency}
                                normalize={normalizeAmount}
                            />
                        </div>
                        <div>
                            <Field
                                name="productType"
                                component={ReduxFormSelect}
                                options={productList}
                                validate={required}
                                errorMessage={requiredError}
                                placeholder="Please select"
                                label='Product Type'
                            />
                        </div>
                        <div>
                            <Field
                                name="productSize"
                                component={ReduxFormSelect}
                                options={productSizes}
                                validate={required}
                                errorMessage={requiredError}
                                placeholder="Please select"
                                label='Product Size'
                                disabled={!productType}
                            />
                        </div>
                        <div>
                            <Field
                                name="productName"
                                component={CustomInput}
                                validate={[required]}
                                errorMessages={{
                                    required: requiredError,
                                }}
                                label='Product Name'
                                disabled={!(productType && productSize)}
                            />
                        </div>
                    </FormSection>
                    <div>
                        <ButtonToolbar>
                            {disableSubmit && (<Link
                                to="/details"
                            >
                                Next
                        </Link>)}
                            <Button as="input" type="submit" variant="primary" value="Submit" size="lg" disabled={pristine || submitting}>Submit</Button>
                            <Button as="input" type="reset" variant="secondary" value="Reset" size="lg" disabled={pristine || submitting} onClick={() => { handleReset('otherDetailsForm') }}>Clear</Button>
                        </ButtonToolbar>
                    </div>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    disableSubmit: get(state, 'user.disableSubmit', false),
    productType: selector(state, 'productType'),
    productSize: selector(state, 'productSize',)

});

const mapDispatchToProps = dispatch => ({
    saveFormValues: () => dispatch(saveForm()),
    setFormSubmittingFlag: val => dispatch(setFormSubmittingFlag(val)),
    handleReset: (name) => dispatch(handleReset(name)),
    onProductTypeChange: () => dispatch(onProductTypeChange()),
});

const OtherDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'otherDetailsForm',
    onSubmit,
    onSubmitFail,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(OtherDetailsForm));

export default OtherDetailsContainer;

