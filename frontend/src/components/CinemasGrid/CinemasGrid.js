import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    Grid,
    Paper,
    Typography
} from '@mui/material';

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
        <Paper sx={{ marginTop: 1, marginBottom: 3, padding: 5 }}>
            <Typography variant="h5" align="center" sx={{ marginBottom: 1 }}>
                Кинотеатры
            </Typography>
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
        </Paper>
    );
}

export default CinemasGrid;