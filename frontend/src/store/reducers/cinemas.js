import { 
    GET_CINEMAS,
    GET_CINEMA,
    CREATE_CINEMA,
    UPDATE_CINEMA,
    DELETE_CINEMA
} from "../types";

const initialState = {
    cinemas: [],
    selectedCinema: null
}

export const cinemas = (state = initialState, action) => {
    switch(action.type) {
        case GET_CINEMAS:
            return {
                ...state,
                cinemas: action.payload
            }

        case GET_CINEMA:
            return {
                ...state,
                selectedCinema: action.payload
            }
        
        case CREATE_CINEMA:
        case UPDATE_CINEMA:
        case DELETE_CINEMA:
            return {
                ...state
            }

        default: return state
    }
}