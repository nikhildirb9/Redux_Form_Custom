export const FORM_SUBMITTED_FLAG = 'FORM_SUBMITTED_FLAG';

export const saveForm = values => () => {
    console.log('submitted values', values);
};

export const setFormSubmittingFlag = val => ({
    type: FORM_SUBMITTED_FLAG,
    payload: val,
});