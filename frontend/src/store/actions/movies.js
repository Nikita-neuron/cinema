import { 
    GET_MOVIE,
    GET_MOVIES,
    CREATE_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE
} from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

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

export const createMovie = (title, description, premiere, producer, actors, duration, country, year, coef, status, genres_id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${MOVIE_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ 
                    title, 
                    description, 
                    premiere, 
                    producer, 
                    actors, 
                    duration, 
                    country, 
                    year, 
                    coef, 
                    status, 
                    genres_id 
                })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_MOVIE,
                    payload: jsonData
                });
                dispatch(getMovies());
            }
            else {
                dispatch(errorOn(`Фильм не добавлен. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Фильм не добавлен. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const updateMovie = (id, title, description, premiere, producer, actors, duration, country, year, coef, status, genres_id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${MOVIE_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    id,
                    title, 
                    description, 
                    premiere, 
                    producer, 
                    actors, 
                    duration, 
                    country, 
                    year, 
                    coef, 
                    status, 
                    genres_id 
                })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_MOVIE,
                    payload: jsonData
                });
                dispatch(getMovies());
            }
            else {
                dispatch(errorOn(`Фильм не обновлен. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Фильм не обновлен. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const deleteMovie = (id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${MOVIE_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_MOVIE,
                    payload: jsonData
                });
                dispatch(getMovies());
            }
            else {
                dispatch(errorOn(`Фильм не удален. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Фильм не удален. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}