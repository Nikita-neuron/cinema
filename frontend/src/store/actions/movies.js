import { GET_MOVIE } from "../types";

const MOVIE_URL = `${process.env.REACT_APP_SERVER_URL}/movie/`;

export const getMovie = (id) => {
    return async dispatch =>  {
        const response = await fetch(`${MOVIE_URL}/${id}`);
        const jsonData = await response.json();

        dispatch({
            type: GET_MOVIE,
            payload: jsonData
        });
    }
}