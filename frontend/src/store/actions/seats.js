import {
    GET_SEATS_BY_HALL,
    UPDATE_SEAT_BY_HALL,
    UPDATE_SEATS_SIZE,
    UPDATE_SEATS_PRICE,
    SAVE_SEATS_BY_HALL,
    
    GET_SEATS,
    CREATE_SEAT,
    UPDATE_SEAT,
    DELETE_SEAT
} from "../types";

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";

import { setAuthHeaders } from "../../utils";

const SEAT_URL = `${process.env.REACT_APP_SERVER_URL}/seat`;

export const getSeatsByHall = (hall_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEAT_URL}/hall/${hall_id}`);
            const jsonData = await response.json();

            dispatch({
                type: GET_SEATS_BY_HALL,
                payload: { data: jsonData, hall_id: hall_id}
            });
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не получены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const saveSeatsByHall = (seats, hall_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${SEAT_URL}/hall/${hall_id}`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ seats })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: SAVE_SEATS_BY_HALL
                });
            }
            else if (response.status == 403) {
                dispatch(errorOn("Данные не сохранены. Ошибка доступа"));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn("Данные не сохранены. Ошибка API"));
            dispatch(loaderOff());
        }
    }
}

export const updateSeatByHall = (newSeat) => {
    return async dispatch => {
        dispatch({
            type: UPDATE_SEAT_BY_HALL,
            payload: newSeat
        });
    }
}

export const updateSeatsSize = (rowNumber, columnNumber) => {
    return async dispatch => {
        dispatch({
            type: UPDATE_SEATS_SIZE,
            payload: { rowNumber, columnNumber }
        });
    }
}

export const updateSeatsPrice = (regularPrice, vipPrice) => {
    return async dispatch => {
        dispatch({
            type: UPDATE_SEATS_PRICE,
            payload: { regularPrice, vipPrice }
        });
    }
}

export const getSeats = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${SEAT_URL}/`, {
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_SEATS,
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

export const createSeat = (row, column, type, price, hall_id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${SEAT_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    row,
                    column,
                    type,
                    price,
                    hall_id
                })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: CREATE_SEAT,
                    payload: jsonData
                });
                dispatch(getSeats());
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

export const updateSeat = (id, row, column, type, price, hall_id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${SEAT_URL}/`, {
                method: "PUT",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    id,
                    row,
                    column,
                    type,
                    price,
                    hall_id
                })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: UPDATE_SEAT,
                    payload: jsonData
                });
                dispatch(getSeats());
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

export const deleteSeat = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${SEAT_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_SEAT,
                    payload: jsonData
                });
                dispatch(getSeats());
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