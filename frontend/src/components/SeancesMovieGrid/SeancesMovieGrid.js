import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SeancesMovieCard from "../SeancesMovieCard/SeancesMovieCard";

import { getSeancesByMovie } from "../../store/actions";
import { 
    Typography,
    Grid,
    Paper
} from "@mui/material";

function SeancesMovieGrid({ movie_id }) {
    const seances = useSelector(state => {
        return state.seances.movieSeances;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeancesByMovie(movie_id));
    }, []);

    return (
        <Paper sx={{ marginTop: 3, marginBottom: 3, padding: 5 }}>
            <Typography variant="h5" align="center">
                Расписание
            </Typography>
            <Grid 
                container 
                justifyContent="center" 
                spacing={ 2 }
                marginTop={ 3 }
            >
                {
                    seances.map(seance => {
                        return (
                            <Grid key={ seance["id"] } item>
                                <SeancesMovieCard data={ seance } />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
}

export default SeancesMovieGrid;