import {
    LOADER_DISPLAY_ON,
    LOADER_DISPLAY_OFF
} from "../types"

export const loaderOn = () => {
    return dispatch => {
        dispatch({
            type: LOADER_DISPLAY_ON
        });
    }
}

export const loaderOff = () => {
    return dispatch => {
        dispatch({
            type: LOADER_DISPLAY_OFF
        });  
    }
}