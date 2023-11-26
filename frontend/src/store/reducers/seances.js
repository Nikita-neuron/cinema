import { 
    GET_SEANCES_BY_CINEMA,
    GET_SEANCES_BY_MOVIE,
    GET_SEANCE
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
        
        default: return state;
    }
}