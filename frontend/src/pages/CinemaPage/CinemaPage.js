import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

import {  
    Typography, 
    Paper,
    Grid,
    Container
} from "@mui/material";

import SeancesGrid from "../../components/SeancesGrid/SeancesGrid";

import { getCinema } from "../../store/actions";

function CinemaPage() {
    const { id } = useParams();

    const cinema = useSelector(state => {
        return state.cinemas.selectedCinema
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCinema(id));
    }, []);

    return (
        <Container>
            <Paper>
                {
                    cinema &&
                    <Grid>
                        <Typography variant="h3" align="center">
                            { cinema.name }
                        </Typography>
                        <Typography variant="h5" align="center">
                            { cinema.address }
                        </Typography>
                    </Grid>
                }
            </Paper>
            <SeancesGrid id={ id } />
        </Container>
    );
}

export default CinemaPage;