import axios from 'axios';
import { isEmpty } from 'lodash';
import { change, getFormSyncErrors } from 'redux-form';

export const FORM_SUBMITTED_FLAG = 'FORM_SUBMITTED_FLAG';

export const saveForm = values => (dispatch, getState) => {
    const errors = getFormSyncErrors('userForm')(getState());
    const error = isEmpty(errors);
    if (error) {
        const details = {
            "first_name": values.firstName,
            "last_name": values.lastName,
            "email": values.email,
            "phone": values.phone,
            "city": values.city,
            "state": values.state,
            "zip_code": values.zip
        };
        return axios.post(`http://localhost:3000/customers`, details)
            .then(response => response.data);
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


export const postalCodeLookup = (postalCode) => (dispatch) => {
    return axios.get(`http://ziptasticapi.com/${postalCode}`)
        .then(response => dispatch(fetchCityStateDetails(response.data)));
};
