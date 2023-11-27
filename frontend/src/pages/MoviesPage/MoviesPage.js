import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import MovieCard from '../../components/MovieCard/MovieCard';

import { getMovies } from '../../store/actions';

import { 
    Typography,
    Grid,
    Paper
} from "@mui/material";

const MoviesPage = () => {
    const dispatch = useDispatch();

    const movies = useSelector(state => {
        return state.movies.movies;
    });

    useEffect(() => {
        dispatch(getMovies());
    }, []);

    return (
        <Paper sx={{ marginTop: 1, marginBottom: 3, padding: 5 }}>
            <Typography variant="h5" align="center">
                Фильмы
            </Typography>
            <Grid 
                container 
                justifyContent="center" 
                spacing={ 2 }
                marginTop={ 1 }
            >
                {
                    movies.map(movie => {
                        return (
                            <Grid key={ movie["id"] } item>
                                <MovieCard movie={ movie } />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
};

export default MoviesPage;