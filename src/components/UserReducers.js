import { FORM_SUBMITTED_FLAG, RECEIVE_REGISTRATION_DETAILS, GET_SUBMISSION_DETAILS, FETCH_PRODUCT_SIZES, GET_FILE_UPDATE, SUBMIT_DETAILS } from './UserActions';

const initialUserForm = {
    disableSubmit: false,
    registeredDetails: [],
    submittedDetails: [],
    sizes: [],
    file: [],
    isFetching: {
        details: false,
    },
};

export const user = (state = initialUserForm, action) => {
    switch (action.type) {
        case SUBMIT_DETAILS:
            return {
                ...state,
                isFetching: {
                    ...state.isFetching,
                    details: true,
                },
            };
        case FORM_SUBMITTED_FLAG:
            return {
                ...state,
                disableSubmit: action.payload,
            };
        case RECEIVE_REGISTRATION_DETAILS: {
            return {
                ...state,
                isFetching: {
                    ...state.isFetching,
                    details: false,
                },
                registeredDetails: action.details,
            };
        }
        case GET_SUBMISSION_DETAILS: {
            return {
                ...state,
                submittedDetails: action.submittedDetails,
            };
        }
        case FETCH_PRODUCT_SIZES: {
            return {
                ...state,
                sizes: action.sizes,
            };
        }
        case GET_FILE_UPDATE: {
            return {
                ...state,
                file: action.file,
            };
        }
        default: return state;
    }
};

