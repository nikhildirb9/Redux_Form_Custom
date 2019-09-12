import { FORM_SUBMITTED_FLAG } from './UserActions';

const initialUserForm = {
    disableSubmit: false,
};

export const user = (state = initialUserForm, action) => {
    switch (action.type) {
        case FORM_SUBMITTED_FLAG:
            return {
                ...state,
                disableSubmit: action.payload,
            };
        default: return state;
    }
};

