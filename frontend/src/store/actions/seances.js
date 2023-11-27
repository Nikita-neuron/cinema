import { 
    GET_SEANCES_BY_CINEMA,
    GET_SEANCES_BY_MOVIE,
    GET_SEANCE
} from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";

const SEANCE_URL = `${process.env.REACT_APP_SERVER_URL}/seance/`;

export const getSeance = (id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/${id}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_SEANCE,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const getSeancesByCinema = (cinema_id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/cinema/${cinema_id}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_SEANCES_BY_CINEMA,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const getSeancesByMovie = (movie_id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/movie/${movie_id}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_SEANCES_BY_MOVIE,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}