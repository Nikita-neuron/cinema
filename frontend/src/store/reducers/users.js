import {
    GET_USERS,
    GET_USER_ME,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    UPDATE_USER_ME,
    LOGOUT_USER_ME,
    GET_USER_ME_IS_ADMIN
} from "../types"

const initialState = {
    users: [],
    user: null,
    isAdmin: false
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
                user: null,
                isAdmin: false
            }
            
        case GET_USER_ME_IS_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case UPDATE_USER:
            return {
                ...state
            }

        case CREATE_USER:
            return {
                ...state
            }

        case DELETE_USER:
            return {
                ...state
            }
        default: return state;
    }
}