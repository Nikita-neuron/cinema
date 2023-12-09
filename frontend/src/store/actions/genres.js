import {
    GET_GENRES,
    CREATE_GENRES,
    UPDATE_GENRES,
    DELETE_GENRES
} from "../types"

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

const GENRE_URL = `${process.env.REACT_APP_SERVER_URL}/genre/`;

export const getGenres = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${GENRE_URL}/`);
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_GENRES,
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

export const createGenre = (name) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${GENRE_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ name })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_GENRES,
                    payload: jsonData
                });
                dispatch(getGenres());
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

export const updateGenre = (id, name) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${GENRE_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ id, name })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_GENRES,
                    payload: jsonData
                });
                dispatch(getGenres());
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

export const deleteGenre = (id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${GENRE_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_GENRES,
                    payload: jsonData
                });
                dispatch(getGenres());
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