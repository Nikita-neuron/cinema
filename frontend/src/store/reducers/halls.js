import {
    GET_HALLS,
    CREATE_HALL,
    UPDATE_HALL,
    DELETE_HALL
} from "../types"

const initialState = {
    halls: []
}

export const halls = (state = initialState, action) => {
    switch (action.type) {
        case GET_HALLS:
            return {
                ...state,
                halls: action.payload
            }
        
        case CREATE_HALL:
        case UPDATE_HALL:
        case DELETE_HALL:
            return {
                ...state
            }
        
        default: return state;
    }
}