import {
    GET_ROLES,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE
} from "../types"

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

const ROLE_URL = `${process.env.REACT_APP_SERVER_URL}/role/`;

export const getRoles = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${ROLE_URL}/`);
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_ROLES,
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

export const createRole = (name) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${ROLE_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ name })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_ROLE,
                    payload: jsonData
                });
                dispatch(getRoles());
            }
            else {
                dispatch(errorOn(`Роль не создана. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Роль не создана. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const updateRole = (id, name) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${ROLE_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ id, name })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_ROLE,
                    payload: jsonData
                });
                dispatch(getRoles());
            }
            else {
                dispatch(errorOn(`Роль не обновлена. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Роль не обновлена. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const deleteRole = (id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${ROLE_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_ROLE,
                    payload: jsonData
                });
                dispatch(getRoles());
            }
            else {
                dispatch(errorOn(`Роль не удалена. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Роль не удалена. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}