import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import ReduxFormSelect from './ReduxFormSelect';
import ReduxFormCheckbox from './ReduxFormCheckbox';
import RadioGroup from './RadioGroup';
import { saveForm, setFormSubmittingFlag, handleReset, onProductTypeChange, toggleModal } from './UserActions';
import { get } from 'lodash';
import { productList, requiredError, required, formatCurrency, normalizeAmount, isCheckboxValid, normalizeDate, number, formatDate, dateRequired } from './utils';
import { Button, ButtonToolbar, ControlLabel, Modal } from 'react-bootstrap';
import FilePondEx from './FilePondEx';
import ComboDatePicker from './ComboDatePicker';
import '../css/userForm.css';

const selector = formValueSelector('otherDetailsForm');

const onSubmit = (values, dispatch) => {
    dispatch(saveForm());
};

const onSubmitFail = (errors, dispatch) => {
    dispatch(setFormSubmittingFlag(false));
};

const closeModal = (dispatch) => {
    dispatch(toggleModal(false));
};

const getProductSizes = (productSizes) => {
    if (productSizes && productSizes.length !== 0) {
        return productSizes.map(option => ({
            value: option,
            label: option,
        }));
    }
    return [];
};


export class OtherDetailsForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting, disableSubmit, handleReset, productType, productSize, onProductTypeChange, productSizes, isReceiveEmails, isTC, showModal, toggleModal } = this.props;
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
                                label="Delivery Date"
                                name="deliveryDate"
                                component={CustomInput}
                                validate={[required]}
                                errorMessages={{
                                    required: requiredError,
                                    invalid: 'invalid date'
                                }}
                                normalize={normalizeDate}
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
                                onChange={(event, newVal) => { onProductTypeChange(event, newVal); }}
                            />
                        </div>
                        <div>
                            <Field
                                name="productSize"
                                component={ReduxFormSelect}
                                options={getProductSizes(productSizes)}
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
                        <div>
                            <Field
                                name="quantity"
                                component={CustomInput}
                                label="Quantity"
                                validate={[required, number]}
                                errorMessages={{
                                    required: requiredError,
                                    invalid: "Enter a number"
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                label="Date of Purchase"
                                name="purchaseDate"
                                labelClassName="select-label"
                                order="mdy"
                                minDate="2000-01-01"
                                attrsDate={{
                                    placeholder: 'Day',
                                    className: 'day-box',
                                }}
                                attrsMonth={{
                                    placeholder: 'Month',
                                    className: 'month-box',
                                }}
                                attrsYear={{
                                    placeholder: 'Year',
                                    className: 'year-box',
                                }}
                                component={ComboDatePicker}
                                normalize={val => formatDate(val)}
                                errorMessages={{
                                    required: requiredError,
                                }}
                                validate={[dateRequired]}
                            />
                        </div>
                        <div>
                            <h4>File Attachments (The maximum file size is 8 MB)</h4>
                            <FilePondEx />
                        </div>
                        <div>
                            <Field
                                name="isReceiveEmails"
                                label="Opt in for future communications (I want to receive future communications, such as coupons, mailings, or other special offers. Failure to submit this registration will not diminish your warranty rights.)"
                                component={ReduxFormCheckbox}
                                checked={isReceiveEmails}
                            />
                        </div>
                        <div>
                            <Field
                                name="isTC"
                                label="By clicking the box you are stating the warranty claim forms are accurate and complete to the best of your knowledge. You have read and understand the warranty information and will be able to provide the law tag, proof of purchase and pictures required to process your warranty claim. I understand that in accordance with this provided warranty that the final judgment as to coverage will be made by Tempur-Pedic."
                                component={ReduxFormCheckbox}
                                checked={isTC}
                                validate={isCheckboxValid}
                                errorMessage={requiredError}
                            />
                        </div>
                    </FormSection>
                    <div>
                        <a href="#" onClick={() => { toggleModal(true); }}>
                            Mattress Description
                        </a>
                        <Modal show={showModal} onHide={() => { toggleModal(false); }}>
                            <Modal.Header closeButton>
                                <Modal.Title>A Mattress Like No Other</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>From the moment you lie down until the moment you rise, every Tempur-Pedic mattress responds to your body's shape, weight, and temperature with up to 2x more pressure-relieving power+ than any other brand.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => { toggleModal(false); }}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
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
    productSize: selector(state, 'productSize'),
    productSizes: get(state, 'user.sizes'),
    isReceiveEmails: selector(state, 'isReceiveEmails'),
    isTC: selector(state, 'isTC'),
    showModal: get(state, 'user.modal', false),
});

const mapDispatchToProps = dispatch => ({
    saveFormValues: () => dispatch(saveForm()),
    setFormSubmittingFlag: val => dispatch(setFormSubmittingFlag(val)),
    handleReset: (name) => dispatch(handleReset(name)),
    onProductTypeChange: (type, newVal) => dispatch(onProductTypeChange(type, newVal)),
    toggleModal: val => dispatch(toggleModal(val)),
});

const OtherDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'otherDetailsForm',
    onSubmit,
    onSubmitFail,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(OtherDetailsForm));

export default OtherDetailsContainer;

