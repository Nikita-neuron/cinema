import {
    GET_USER_ME,
    UPDATE_USER_ME,
    LOGOUT_USER_ME
} from "../types"

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders, setUser, removeUser } from "../../utils";

const USER_URL = `${process.env.REACT_APP_SERVER_URL}/user`;

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