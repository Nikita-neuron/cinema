import { 
    GET_CINEMAS,
    GET_CINEMA 
} from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";

const CINEMA_URL = `${process.env.REACT_APP_SERVER_URL}/cinema/`;

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
            const response = await fetch(CINEMA_URL);
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