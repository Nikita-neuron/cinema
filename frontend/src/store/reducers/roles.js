import {
    GET_ROLES,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE
} from "../types"

const initialState = {
    roles: []
}

export const roles = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        
        case GET_ROLES:
        case CREATE_ROLE:
        case UPDATE_ROLE:
        case DELETE_ROLE:
            return {
                ...state
            }
        default: return state;
    }
}