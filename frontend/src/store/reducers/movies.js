import { GET_MOVIE } from "../types";

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
        
        default: return state;
    }
}