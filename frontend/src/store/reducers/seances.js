import { 
    GET_SEANCES_BY_CINEMA,
    GET_SEANCES_BY_MOVIE,
    GET_SEANCE,
    GET_SEANCES,
    CREATE_SEANCE,
    UPDATE_SEANCE,
    DELETE_SEANCE
} from "../types";

const initialState = {
    seances: [],
    selectedSeance: null,
    cinemaSeances: [],
    movieSeances: []
}

export const seances = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEANCE:
            return {
                ...state,
                selectedSeance: action.payload
            }
        case GET_SEANCES_BY_CINEMA:
            return {
                ...state,
                cinemaSeances: action.payload
            }

        case GET_SEANCES_BY_MOVIE:
            return {
                ...state,
                movieSeances: action.payload
            }

        case GET_SEANCES:
            return {
                ...state,
                seances: action.payload
            }

        case CREATE_SEANCE:
        case UPDATE_SEANCE:
        case DELETE_SEANCE:
            return {
                ...state
            }
        
        default: return state;
    }
}