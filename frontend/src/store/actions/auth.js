import { 
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_UP,
    SIGN_UP_ERROR
} from "../types";

import { setUser } from "../../utils";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";

const AUTH_URL = `${process.env.REACT_APP_SERVER_URL}/auth`;

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${AUTH_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const jsonData = await response.json();

            if (response.ok) {
                setUser({
                    "email": jsonData.data.email,
                    "firstName": jsonData.data.firstName
                });
                dispatch({
                    type: SIGN_IN,
                    payload: jsonData
                });
            } else {
                dispatch({
                    type: SIGN_IN_ERROR,
                    payload: jsonData
                });
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Вход не выполнен. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const registration = (firstName, lastName, email, password) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${AUTH_URL}/registration`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const jsonData = await response.json();

            if (response.ok) {
                setUser({
                    "email": jsonData.data.email,
                    "firstName": jsonData.data.firstName
                });
                dispatch({
                    type: SIGN_UP,
                    payload: jsonData
                });
            } else {
                dispatch({
                    type: SIGN_UP_ERROR,
                    payload: jsonData
                });
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Регистрация не выполнена. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}