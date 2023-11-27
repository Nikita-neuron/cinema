import {
    GET_USER_ME,
    UPDATE_USER_ME,
    LOGOUT_USER_ME
} from "../types"

const initialState = {
    user: null
}

export const users = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_ME:
            return {
                ...state,
                user: action.payload
            }
        case UPDATE_USER_ME:
            localStorage.setItem('jwtToken', action.payload.token);
            return state
        
        case LOGOUT_USER_ME:
            localStorage.removeItem('jwtToken');
            return {
                ...state,
                user: null
            }
            
        default: return state;
    }
}