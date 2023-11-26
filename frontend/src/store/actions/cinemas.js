import { GET_CINEMAS, GET_CINEMA } from "../types";

const CINEMA_URL = `${process.env.REACT_APP_SERVER_URL}/cinema/`;

export const getCinema = (id) => {
    return async dispatch =>  {
        const response = await fetch(`${CINEMA_URL}/${id}`);
        const jsonData = await response.json();

        dispatch({
            type: GET_CINEMA,
            payload: jsonData
        });
    }
}

export const getCinemas = () => {
    return async dispatch =>  {
        const response = await fetch(CINEMA_URL);
        const jsonData = await response.json();

        dispatch({
            type: GET_CINEMAS,
            payload: jsonData
        });
    }
}