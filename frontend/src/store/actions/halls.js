import {
    GET_HALLS,
    CREATE_HALL,
    UPDATE_HALL,
    DELETE_HALL
} from "../types"

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

const HALL_URL = `${process.env.REACT_APP_SERVER_URL}/hall`;

export const getHalls = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${HALL_URL}/`);
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_HALLS,
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

export const createHall = (name, cinema_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${HALL_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ name, cinema_id })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_HALL,
                    payload: jsonData
                });
                dispatch(getHalls());
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

export const updateHall = (id, name, cinema_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${HALL_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ id, name, cinema_id })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_HALL,
                    payload: jsonData
                });
                dispatch(getHalls());
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

export const deleteHall = (id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${HALL_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_HALL,
                    payload: jsonData
                });
                dispatch(getHalls());
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