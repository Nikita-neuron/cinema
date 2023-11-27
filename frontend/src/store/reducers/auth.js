import { 
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_UP,
    SIGN_UP_ERROR,
    LOGOUT_USER_ME
} from "../types";

const initialState = {
    isAuthenticated: false,
    error: null
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
        case SIGN_UP:
            localStorage.setItem('jwtToken', action.payload.data.token);
            return {
                ...state,
                error: null,
                isAuthenticated: true
            }
        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload.error
            }
        case LOGOUT_USER_ME:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            }
        default: return state;
    }
}