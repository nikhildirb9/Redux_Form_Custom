import axios from 'axios';
import { isEmpty, get } from 'lodash';
import { change, getFormSyncErrors, reset, formValueSelector, clearFields } from 'redux-form';

export const FORM_SUBMITTED_FLAG = 'FORM_SUBMITTED_FLAG';

export const RECEIVE_REGISTRATION_DETAILS = 'RECEIVE_REGISTRATION_DETAILS';

export const GET_SUBMISSION_DETAILS = 'GET_SUBMISSION_DETAILS';

export const FETCH_PRODUCT_SIZES = 'FETCH_PRODUCT_SIZES';

export const GET_FILE_UPDATE = 'GET_FILE_UPDATE';

export const getSubmissionDetails = (submittedDetails) => ({
    type: GET_SUBMISSION_DETAILS,
    submittedDetails,
});

const receiveRegistrationDetails = (details) => ({
    type: RECEIVE_REGISTRATION_DETAILS,
    details,
});

export const fetchRegistrationDetails = () => (dispatch) => {
    return axios.get(`http://localhost:3000/customers`)
    .then(response => dispatch(receiveRegistrationDetails(response.data)));
};

export const saveForm = () => (dispatch, getState) => {
    const userFormErrors = getFormSyncErrors('userForm')(getState());
    const productFormErrors = getFormSyncErrors('otherDetailsForm')(getState());

    const userFormSelector = formValueSelector('userForm');
    const productDetailsSelector = formValueSelector('otherDetailsForm');
    const userError = isEmpty(userFormErrors);
    const productFormError = isEmpty(productFormErrors);
    if (userError && productFormError) {
        const details = {
            "first_name": userFormSelector(getState(), 'firstName'),
            "last_name": userFormSelector(getState(), 'lastName'),
            "email": userFormSelector(getState(), 'email'),
            "phone": userFormSelector(getState(), 'phone'),
            "city": userFormSelector(getState(), 'city'),
            "state": userFormSelector(getState(), 'state'),
            "zip_code": userFormSelector(getState(), 'zip'),
            "product_type": productDetailsSelector(getState(), 'productType'),
            "store_name": productDetailsSelector(getState(), 'storeName'),
            "registered_store": productDetailsSelector(getState(), 'registeredStore'),
            "purchase_price": productDetailsSelector(getState(), 'purchasePrice'),
            "product_name": productDetailsSelector(getState(), 'productName'),
            "attachments": get(getState(), 'user.file'),
        };
        return axios.post(`http://localhost:3000/customers`, details)
            .then(response => {
                dispatch(getSubmissionDetails(response.data));
                dispatch(setFormSubmittingFlag(true));
            });
    }
};

export const setFormSubmittingFlag = val => ({
    type: FORM_SUBMITTED_FLAG,
    payload: val,
});

const fetchCityStateDetails = (data) => (dispatch) => {
    dispatch(change('userForm', `city`, data.city));
    dispatch(change('userForm', `state`, data.state));
};

export const clearCityStateValues = () => (dispatch) => {
    dispatch(change('userForm', `city`, null));
    dispatch(change('userForm', `state`, null));
};


export const postalCodeLookup = (postalCode) => (dispatch, getState) => {
    const errors = getFormSyncErrors('userForm')(getState());
    const postalCodeError = get(errors, 'zip');
    if (!postalCodeError) {
        return axios.get(`http://ziptasticapi.com/${postalCode}`)
            .then(response => dispatch(fetchCityStateDetails(response.data)));
    }
};

export const handleReset = (formName) => (dispatch) => {
    dispatch(reset(formName));
    dispatch(setFormSubmittingFlag(false));
};

export const deleteDetail = (value) => (dispatch) => {
    return axios.delete(`http://localhost:3000/customers/${value}`)
        .then(response => {
            response.data;
            dispatch(fetchRegistrationDetails());
        });
};

const fetchProductSizes = (sizes) => ({
    type: FETCH_PRODUCT_SIZES,
    sizes,
});

export const onProductTypeChange = (ev, productType) => (dispatch) => {
    const fieldNames = ['productSize', 'productName'];
    const fields = fieldNames.map(fieldName => `${fieldName}`);
    dispatch(clearFields('otherDetailsForm', false, false, ...fields));
    dispatch(getProductSizes(ev, productType));
};

export const getProductSizes = (ev, productType) => (dispatch, getState) => {
    return axios.get(`http://localhost:3000/${productType}`)
        .then(response => dispatch(fetchProductSizes(response.data)));
};

export const fileUpdate = (file) => ({
    type: GET_FILE_UPDATE,
    file,
});

export const getFileUpdate = (files) => (dispatch) => {
    const fileItems = files.map(fileItem => fileItem.file);
    return dispatch(fileUpdate(fileItems));
};