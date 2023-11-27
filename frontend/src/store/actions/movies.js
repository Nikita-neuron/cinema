import { GET_MOVIE, GET_MOVIES } from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";

const MOVIE_URL = `${process.env.REACT_APP_SERVER_URL}/movie/`;

export const getMovie = (id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${MOVIE_URL}/${id}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_MOVIE,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const getMovies = () => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${MOVIE_URL}/`);
            const jsonData = await response.json();

            dispatch({
                type: GET_MOVIES,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}