import { 
    GET_CINEMAS,
    GET_CINEMA,
    CREATE_CINEMA,
    UPDATE_CINEMA,
    DELETE_CINEMA
} from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

const CINEMA_URL = `${process.env.REACT_APP_SERVER_URL}/cinema`;

export const getCinema = (id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${CINEMA_URL}/${id}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_CINEMA,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const getCinemas = () => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${CINEMA_URL}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_CINEMAS,
                payload: jsonData
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const createCinema = (name, address) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${CINEMA_URL}`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ name, address })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_CINEMA,
                    payload: jsonData
                });
                dispatch(getCinemas());
            }
            else {
                dispatch(errorOn(`Кинотеатр не создана. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const updateCinema = (id, name, address) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${CINEMA_URL}`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ id, name, address })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_CINEMA,
                    payload: jsonData
                });
                dispatch(getCinemas());
            }
            else {
                dispatch(errorOn(`Кинотеатр не создан. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const deleteCinema = (id) => {
    return async dispatch =>  {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${CINEMA_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_CINEMA,
                    payload: jsonData
                });
                dispatch(getCinemas());
            }
            else {
                dispatch(errorOn(`Кинотеатр не удален. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}