import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import { 
    Typography,
    Grid,
    Box,
    Paper
} from "@mui/material";

import SeanceHall from "../../components/SeanceHall/SeanceHall";

import { getSeance } from "../../store/actions";

function BuyTicketPage() {
    const { id } = useParams();

    const seance = useSelector(state => state.seances.selectedSeance );
    const { redirectAfterBuy } = useSelector(state => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeance(id));
    }, []);

    return (
        <Paper>
            {
                redirectAfterBuy &&
                <Navigate to={ `/me` } replace={true}/>
            }
            {
                seance && 
                <Box 
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                // width: "auto"
                            }}
                        >
                            { seance.Movie.title }
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            { seance.Hall.Cinema.name }
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            marginTop: 2
                        }}
                    >
                        <Typography>
                            { seance.begin }
                        </Typography>
                    </Box>
                    <SeanceHall hall={ seance.Hall } seance_id={ seance.id } />
                </Box>
            }
        </Paper>
    );
}

export default BuyTicketPage;