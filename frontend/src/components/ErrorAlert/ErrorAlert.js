import React from "react";
import { useSelector } from "react-redux";

import { Alert } from "@mui/material";

const ErrorAlert = () => {
    const error = useSelector(state => {
        return state.loader.error;
    });
    return (
        error && 
        <Alert variant="filled" severity="error" sx={{ position: "fixed", left: "50%", top: "20%", transform: "translate(-50%,-50%)", zIndex: 100 }}>
            { error }
        </Alert>
    );
}

export default ErrorAlert;