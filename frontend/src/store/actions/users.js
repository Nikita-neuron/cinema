import {
    GET_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_USER_ME,
    UPDATE_USER_ME,
    LOGOUT_USER_ME,
    GET_USER_ME_IS_ADMIN
} from "../types"

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders, setUser, removeUser } from "../../utils";

const USER_URL = `${process.env.REACT_APP_SERVER_URL}/user`;

export const getMeIsAdmin = (showMessage = true) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/me/isAdmin`, {
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_USER_ME_IS_ADMIN,
                    payload: jsonData
                });
            }
            else {
                if (showMessage) {
                    dispatch(errorOn(`Данные не получены. ${jsonData}`));
                }
            }
            dispatch(loaderOff());
        } catch (err) {
            if (showMessage) {
                dispatch(errorOn(`Данные не получены. Ошибка API`));
                dispatch(loaderOff());
            }
        }
    }
}

export const getUserMe = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/me`, {
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_USER_ME,
                    payload: jsonData
                });
                dispatch(getMeIsAdmin());
            }
            else {
                dispatch(errorOn(`Данные не получены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Данные не получены. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}

export const updateMe = (firstName, lastName, email) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/me`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ firstName, lastName, email })
            });
            const jsonData = await response.json();

            if (response.ok) {
                setUser({
                    "email": jsonData.email
                });
                dispatch({
                    type: UPDATE_USER_ME,
                    payload: jsonData
                });
                dispatch(getUserMe());
            }
            else {
                dispatch(errorOn(`Данные не изменены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Данные не изменены. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}

export const logoutMe = () => {
    return async dispatch => {
        removeUser();
        dispatch({
            type: LOGOUT_USER_ME
        });
    }
}

export const getUsers = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/`, {
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_USERS,
                    payload: jsonData
                });
            }
            else {
                dispatch(errorOn(`Данные не получены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Данные не получены. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}

export const createUser = (firstName, lastName, email, password, role_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ firstName, lastName, email, password, role_id })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_USER,
                    payload: jsonData
                });
                dispatch(getUsers());
            }
            else {
                dispatch(errorOn(`Пользователь не создан. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Пользователь не создан. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}

export const updateUser = (id, firstName, lastName, email, password, role_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ id, firstName, lastName, email, password, role_id })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_USER,
                    payload: jsonData
                });
                dispatch(getUsers());
            }
            else {
                dispatch(errorOn(`Данные не обновлены. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Данные не обновлены. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}

export const deleteUser = (id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${USER_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_USER,
                    payload: jsonData
                });
                dispatch(getUsers());
            }
            else {
                dispatch(errorOn(`Пользователь не удален. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Пользователь не удален. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}