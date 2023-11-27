import { GET_MOVIE, GET_MOVIES } from "../types";

const initialState = {
    movies: [],
    selectedMovie: null
}

export const movies = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload
            }
        
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        
        default: return state;
    }
}