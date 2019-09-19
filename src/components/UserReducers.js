import { FORM_SUBMITTED_FLAG, RECEIVE_REGISTRATION_DETAILS, GET_SUBMISSION_DETAILS } from './UserActions';

const initialUserForm = {
    disableSubmit: false,
    registeredDetails: [],
    submittedDetails: [],
};

export const user = (state = initialUserForm, action) => {
    switch (action.type) {
        case FORM_SUBMITTED_FLAG:
            return {
                ...state,
                disableSubmit: action.payload,
            };
        case RECEIVE_REGISTRATION_DETAILS: {
            return {
                ...state,
                registeredDetails: action.details,
            };
        }
        case GET_SUBMISSION_DETAILS: {
            return {
                ...state,
                submittedDetails: action.submittedDetails,
            };
        }
        default: return state;
    }
};

