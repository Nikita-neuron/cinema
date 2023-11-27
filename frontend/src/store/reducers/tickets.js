import {
    SAVE_TICKET,
    GET_USER_TICKETS
} from "../types"

const initialState = {
    tickets: [],
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
            
        default: return state
    }
}