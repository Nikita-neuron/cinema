import React, { useState} from "react";

import { 
    Box,
    Button,
    Tooltip,
    Typography
} from "@mui/material";

function SeanceHallSeat({ seat, onClick, chosen }) {
    const [isHover, setIsHover] = useState(false);

    const chooseColor = (type) => {
        if (chosen) return "#5DE100";
        switch(type) {
            case "Обычное": return '#0063cc';
            case "VIP": return "#FF9900";
            case "disabled": return "#86878D";
        }
    }

    let flg = false;
    let width = 20;
    let height = 20;
    let btnWidth = "100%";
    let btnHeight = "100%";
    let display = "block"
    let transform = "scale(1.0)";
    let hovertext = seat.column;
    let hover = {
        backgroundColor: chooseColor(seat.type),
        transform: "scale(1.5)"
    }

    if (seat.type == "disabled") {
        display = "none"
    }

    if (seat.type == "disabled" || seat.taken) {
        flg = true;
        hover = { backgroundColor: chooseColor(seat.type) }

        btnWidth = 10;
        btnHeight = 10;
        hovertext = "";
    }

    if (seat.row == 0) {
        flg = true;
        hover = { backgroundColor: chooseColor(seat.type) };
        hovertext = "";
    }

    if (chosen) {
        transform = "scale(1.5)";
        hovertext = "";
    }

    return (
        <Tooltip                              
            disableInteractive
            open={!flg && isHover}
            arrow
            placement="top"
            title={ 
                <Box>
                    <Typography align="center">{ seat.price } ₽</Typography>
                    <Typography align="center">{ `${seat.row} ряд, ${seat.column} место` }</Typography>
                </Box>
            }
                                            
        >
            <Box
                sx={{
                    height: width,
                    width: height,
                    margin: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "transparent"
                }}
                onClick={ onClick }
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <Button 
                    sx={{
                        display: display,
                        height: btnHeight,
                        width: btnWidth,
                        minWidth: 0,
                        margin: 0,
                        padding: 0,
                        borderRadius: "50%",
                        backgroundColor: chooseColor(seat.type),
                        transform: transform,
                        alignItems: "center",
                        '&:hover': hover,
                        '&:hover:before': {
                            content: `'${ hovertext }'`
                        },
                        content: `'${seat.column}'`
                    }}
                    variant="contained"
                >{ chosen && seat.column}</Button>
            </Box>
        </Tooltip>
    );
}

export default SeanceHallSeat;