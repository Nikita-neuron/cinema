import React from "react";

import { 
    Grid,
    Box,
    Button,
    Tooltip,
    Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';

import HallCreate from "../HallCreate/HallCreate";

function SeanceHall({ hall }) {
    const seats = hall.Seats;
    // console.log(seats);

    let maxRow = 0;
    let maxColumn = 0;

    seats.forEach(seat => {
        maxRow = Math.max(maxRow, seat.row);
        maxColumn = Math.max(maxColumn, seat.column);
    });

    let seatsMatrix = [];
    for (let i = 0; i < maxRow; i++) {
        seatsMatrix[i] = new Array(maxColumn).fill(0);
    }

    seats.forEach(seat => {
        seatsMatrix[seat.row - 1][seat.column - 1] = seat;
    });

    // console.log(seatsMatrix);

    const ColorButton = styled(Button)(({ theme }) => ({
        height: 20,
        width: 20,
        minWidth: 0,
        margin: 3,
        padding: 0,
        borderRadius: "50%",
        backgroundColor: '#0063cc',
        '&:hover': {
            transform: "scale(1.5)"
        },
    }));

    return (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }} >
            {
                // seatsMatrix.map((seatsRow, index) => 
                //     <Grid key={ index } container direction="row" sx={{ flexDirection: "column", width: "auto" }}>
                //         {
                //             seatsRow.map(seat => 
                //                 <Tooltip
                //                     key={ seat.id }
                //                     arrow
                //                     title={
                //                         <Box>
                //                             <Typography align="center">{ seat.price } ₽</Typography>
                //                             <Typography align="center">{ `${seat.row} ряд, ${seat.column} место` }</Typography>
                //                         </Box>
                //                     }
                //                     placement="top"
                //                 >
                //                     <ColorButton variant="contained" />
                //                 </Tooltip>
                //             )
                //         }
                //     </Grid>
                // )
            }
            <HallCreate hall={ hall } />
        </Box>
    );
}

export default SeanceHall;