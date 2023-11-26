import { 
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_UP,
    SIGN_UP_ERROR
} from "../types";

const AUTH_URL = `${process.env.REACT_APP_SERVER_URL}/auth`;

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const jsonData = await response.json();

        if (response.ok) {
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
    }
}

export const registration = (firstName, lastName, email, password) => {
    return async dispatch => {
        const response = await fetch(`${AUTH_URL}/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const jsonData = await response.json();

        if (response.ok) {
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
    }
}