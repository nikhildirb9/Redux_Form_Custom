import axios from 'axios';
import { change } from 'redux-form';

export const FORM_SUBMITTED_FLAG = 'FORM_SUBMITTED_FLAG';

export const saveForm = values => () => {
    console.log('submitted values', values);
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


export const postalCodeLookup = (postalCode) => (dispatch) => {
    return axios.get(`http://ziptasticapi.com/${postalCode}`)
        .then(response => dispatch(fetchCityStateDetails(response.data)));
};