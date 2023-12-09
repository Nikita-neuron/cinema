import {
    GET_GENRES,
    CREATE_GENRES,
    UPDATE_GENRES,
    DELETE_GENRES
} from "../types"

const initialState = {
    genres: []
}

export const genres = (state = initialState, action) => {
    switch (action.type) {
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        
        case CREATE_GENRES:
        case UPDATE_GENRES:
        case DELETE_GENRES:
            return {
                ...state
            }
        
        default: return state;
    }
}