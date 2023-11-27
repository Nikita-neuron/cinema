import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

import {  
    Typography, 
    Paper,
    Grid,
    Container,
    Box,
    List,
    ListItem,
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell
} from "@mui/material";

import { makeStyles } from '@mui/styles';

import SeancesMovieGrid from "../../components/SeancesMovieGrid/SeancesMovieGrid";

import { getMovie } from "../../store/actions";

const useStyles = makeStyles({
    item: {
      ':not(:first-child)&::before': {
        margin: 6,
        content: '"•"',
      }
    },
    tableCell: {
        "border-bottom": "none"
    }
});

function MoviePage() {
    const { id } = useParams();
    const classes = useStyles();

    const movie = useSelector(state => {
        return state.movies.selectedMovie
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovie(id));
    }, []);

    return (
        <Container>
            {
                movie &&
                <Container>
                    <Paper sx={{ padding: 5 }} >
                        <Box
                            component="div"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Box 
                                component="img"
                                sx={{ width: 190, marginRight: 3}}
                                src="https://lipsum.app/190x280"
                                title={ movie.title }
                            />
                            <Box
                                component="div"
                            >
                                <List
                                    sx={{ display: "flex", justifyContent: "left" }}
                                >
                                    { movie.genres.map(genre => {
                                        return (
                                            <ListItem 
                                                key={ genre.id } 
                                                sx={{ padding: 0, width: "auto" }} 
                                                className={classes.item}
                                            >
                                                <Typography>
                                                    { genre.name }
                                                </Typography>
                                            </ListItem>
                                        )
                                    }) }
                                </List>
                                <Typography variant="h4" align="center">
                                    { movie.title }
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                    <SeancesMovieGrid name="schedule" movie_id={ movie.id } />
                    <Paper sx={{ padding: 5 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2 }} >
                            О фильме
                        </Typography>
                        <Typography>
                            { movie.description }
                        </Typography>
                        <Table sx={{ width: "auto" }} >
                            <TableBody>
                                <TableRow >
                                    <TableCell sx={{ borderBottom: "none" }} >Премьера</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }} >{ movie.premiere }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }} >Режиссёр</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }} >{ movie.producer }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }} >В ролях</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }} >{ movie.actors }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }} >Время</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }} >{ movie.duration }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }} >Страна</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }} >{ movie.country }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }} >Год производства</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }} >{ movie.year }</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            }
        </Container>
    );
}

export default MoviePage;