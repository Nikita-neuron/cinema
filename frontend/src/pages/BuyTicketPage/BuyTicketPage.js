import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

import { 
    Typography,
    Grid,
    Paper
} from "@mui/material";

import SeanceHall from "../../components/SeanceHall/SeanceHall";

import { getSeance } from "../../store/actions";

function BuyTicketPage() {
    const { id } = useParams();

    const seance = useSelector(state => {
        return state.seances.selectedSeance;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeance(id));
    }, []);

    // console.log(seance);
    return (
        <Paper>
            {
                seance && 
                <SeanceHall hall={ seance.Hall } />
            }
        </Paper>
    );
}

export default BuyTicketPage;