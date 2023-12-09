import {
    SAVE_TICKET,
    GET_USER_TICKETS,
    GET_TICKETS,
    CREATE_TICKET,
    DELETE_TICKET,
    UPDATE_TICKET
} from "../types"

const initialState = {
    tickets: [],
    allTickets: [],
    redirectAfterBuy: false
}

export const tickets = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TICKET:
            return {
                ...state,
                redirectAfterBuy: true
            }

        case GET_USER_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                redirectAfterBuy: false
            }

        case GET_TICKETS:
            return {
                ...state,
                allTickets: action.payload
            }

        case CREATE_TICKET:
        case UPDATE_TICKET:
        case DELETE_TICKET:
            return {
                ...state
            }
            
        default: return state
    }
}