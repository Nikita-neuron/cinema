import {
    SAVE_TICKET,
    GET_USER_TICKETS,
    DELETE_TICKET
} from "../types"

import { loaderOn, loaderOff } from "./loader";
import { errorOn } from "./errors";
import { setAuthHeaders } from "../../utils";

const TICKET_URL = `${process.env.REACT_APP_SERVER_URL}/ticket`;

export const getUserTickets = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${TICKET_URL}/me`, {
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: GET_USER_TICKETS,
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

export const saveTicket = (seance_id, seat_id) => {
    return async dispatch => {
        try {
            dispatch(loaderOn());
            const response = await fetch(`${TICKET_URL}/`, {
                method: "POST",
                headers: setAuthHeaders({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    seance_id,
                    seat_id
                })
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: SAVE_TICKET,
                    payload: jsonData
                });
            }
            else {
                dispatch(errorOn(`Билет не куплен. ${jsonData}`));
            }
            dispatch(loaderOff());
        } catch (err) {
            dispatch(errorOn(`Билет не куплен. Ошибка API`));
            dispatch(loaderOff());
        }
    }
}

export const deleteTicket = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${TICKET_URL}/${id}`, {
                method: "DELETE",
                headers: setAuthHeaders()
            });
            const jsonData = await response.json();

            if (response.ok) {
                dispatch({
                    type: DELETE_TICKET,
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