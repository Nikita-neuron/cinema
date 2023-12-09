import { 
    GET_SEANCES_BY_CINEMA,
    GET_SEANCES_BY_MOVIE,
    GET_SEANCE,
    GET_SEANCES,
    CREATE_SEANCE,
    UPDATE_SEANCE,
    DELETE_SEANCE
} from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

const SEANCE_URL = `${process.env.REACT_APP_SERVER_URL}/seance`;

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

export const getSeances = () => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/`);
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_SEANCES,
                    payload: jsonData
                });
            }
            else {
                dispatch(errorOn(`Данные не получены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const createSeance = (begin, movie_id, hall_id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ begin, movie_id, hall_id })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_SEANCE,
                    payload: jsonData
                });
                dispatch(getSeances());
            }
            else {
                dispatch(errorOn(`Данные не получены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const updateSeance = (id, begin, movie_id, hall_id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ id, begin, movie_id, hall_id })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_SEANCE,
                    payload: jsonData
                });
                dispatch(getSeances());
            }
            else {
                dispatch(errorOn(`Данные не получены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const deleteSeance = (id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEANCE_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_SEANCE,
                    payload: jsonData
                });
                dispatch(getSeances());
            }
            else {
                dispatch(errorOn(`Данные не получены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}