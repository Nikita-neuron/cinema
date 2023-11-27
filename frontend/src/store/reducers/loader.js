import {
    LOADER_DISPLAY_ON,
    LOADER_DISPLAY_OFF,

    ERROR_SAVE_ON,
    ERROR_SAVE_OFF
} from "../types"

const initialState = {
    loading: false,
    error: null
}

export const loader = (state = initialState, action) => {
    switch(action.type) {
        case LOADER_DISPLAY_ON:
            return {
                ...state,
                loading: true
            }
        
        case LOADER_DISPLAY_OFF:
            return {
                ...state,
                loading: false
            }
        
        case ERROR_SAVE_ON:
            return {
                ...state,
                error: action.payload
            }
        
        case ERROR_SAVE_OFF:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}