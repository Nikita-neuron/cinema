import React from "react";

import { 
    Grid,
    Box,
    Button,
    Tooltip,
    Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';

function HallCreateSeat({ seat }) {
    // console.log(seat)

    let color = '#0063cc'

    if (seat.type == "VIP") {
        color = "#FF9900"
    }
    else if (seat.type == "disabled") {
        color = "#86878D"
    }

    const SeatButton = styled(Button)(({ theme }) => ({
        height: 20,
        width: 20,
        minWidth: 0,
        margin: 4,
        padding: 0,
        borderRadius: "50%",
        backgroundColor: color,
        '&:hover': {
            backgroundColor: color,
            transform: "scale(1.5)"
        },
    }));

    return (
        <Tooltip
            disableHoverListener={ seat.row == 0 }
            arrow
            disableInteractive
            title={
                <Box>
                    <Typography align="center">{ seat.price } ₽</Typography>
                    <Typography align="center">{ `${seat.row} ряд, ${seat.column} место` }</Typography>
                </Box>
            }
            placement="top"
        >
            <SeatButton variant="contained" />
        </Tooltip>
    );
}

export default HallCreateSeat