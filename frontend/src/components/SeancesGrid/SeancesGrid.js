import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import SeanceCard from "../SeanceCard/SeanceCard";

import { getSeancesByCinema } from "../../store/actions";

function SeancesGrid({ id }) {
    const seances = useSelector(state => {
        return state.seances.cinemaSeances
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeancesByCinema(id));
    }, []);

    return (
        <Grid container justifyContent="center" spacing={ 2 } marginTop={ 5 }>
            {
                seances.map(seance => {
                    return (
                        <Grid key={ seance["id"] } item>
                            <SeanceCard data={ seance } />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default SeancesGrid;