import {
    ERROR_SAVE_ON,
    ERROR_SAVE_OFF
} from "../types"

export const errorOn = (text) => {
    return dispatch => {
        dispatch({
            type: ERROR_SAVE_ON,
            payload: text
        });

        setTimeout(() => {
            dispatch(errorOff());
        }, 2000);
    }
}

export const errorOff = () => {
    return dispatch => {
        dispatch({
            type: ERROR_SAVE_OFF
        });
    }
}