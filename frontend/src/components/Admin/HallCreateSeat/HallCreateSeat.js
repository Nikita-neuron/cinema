import React, { useState } from "react";

import { 
    Box,
    Button,
    Tooltip,
    Typography
} from "@mui/material";

function HallCreateSeat({ seat, onClick }) {
    const [isHover, setIsHover] = useState(false);

    const chooseColor = (type) => {
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
    let hover = {
        backgroundColor: chooseColor(seat.type),
        transform: "scale(1.5)"
    }

    if (seat.type == "disabled") {
        flg = true;
        hover = { backgroundColor: chooseColor(seat.type) }

        btnWidth = 10;
        btnHeight = 10;
    }

    if (seat.row == 0) {
        flg = true;
        hover = { backgroundColor: chooseColor(seat.type) };
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
                        height: btnHeight,
                        width: btnWidth,
                        minWidth: 0,
                        margin: 0,
                        padding: 0,
                        borderRadius: "50%",
                        backgroundColor: chooseColor(seat.type),
                        '&:hover': hover
                    }}
                    variant="contained"
                />
            </Box>
        </Tooltip>
    );
}

export default HallCreateSeat