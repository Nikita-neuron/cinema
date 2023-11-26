import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from '@mui/material/Grid';

import CinemaCard from "../CinemaCard/CinemaCard";

import { getCinemas } from "../../store/actions";

function CinemasGrid() {
    const cinemas = useSelector(state => {
        return state.cinemas.cinemas;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCinemas());
    }, []);

    return (
        <Grid container justifyContent="center" spacing={ 2 }>
            {
                cinemas.map(cinema => {
                    return (
                        <Grid key={ cinema["id"] } item>
                            <CinemaCard data={ cinema } />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default CinemasGrid;