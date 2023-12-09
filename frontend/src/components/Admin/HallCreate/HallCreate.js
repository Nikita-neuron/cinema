import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    Grid,
    Box,
    Button,
    Typography,
    Paper,
    TextField
} from "@mui/material";

import HallCreateSeat from "../HallCreateSeat/HallCreateSeat";

import { getSeatsByHall, updateSeatByHall, updateSeatsSize, updateSeatsPrice, saveSeatsByHall } from "../../../store/actions";

function HallCreate({ hall }) {
    const dispatch = useDispatch();

    const { seats, rowNumber, columnNumber, regularPrice, vipPrice } = useSelector(state => {
        return state.seats
    });

    let exSeat = {
        row: 0,
        column: 0,
        type: "Обычное",
        price: regularPrice,
        hall_id: hall.id
    }

    useEffect(() => {
        dispatch(getSeatsByHall(hall.id));
    }, []);

    const handleRowNumber = (e) => {
        let value = Number(e.target.value);
        if (value <= 0) return;

        dispatch(updateSeatsSize(value, columnNumber));
    }

    const handleColumnNumber = (e) => {
        let value = Number(e.target.value);
        if (value <= 0) return;

        dispatch(updateSeatsSize(rowNumber, value));
    }

    const handleRegularPrice = (e) => {
        let value = Number(e.target.value);
        if (value <= 0) return;

        dispatch(updateSeatsPrice(value, vipPrice));
    }

    const handleVipPrice = (e) => {
        let value = Number(e.target.value);
        if (value <= 0) return;

        dispatch(updateSeatsPrice(regularPrice, value));
    }

    const handleOnSeatClick = (seat) => {
        return (e) => {
            let newSeat = {...seat};
            if (newSeat.type == "Обычное") {
                newSeat.type = "VIP";
                newSeat.price = vipPrice;
            }
            else if (newSeat.type == "VIP") {
                newSeat.type = "disabled";
                newSeat.price = 1;
            }
            else if (newSeat.type == "disabled") {
                newSeat.type = "Обычное";
                newSeat.price = regularPrice;
            }
            dispatch(updateSeatByHall(newSeat));
        }
    }

    const handleSave = (e) => {
        dispatch(saveSeatsByHall(seats.flat(), hall.id));
    }

    return (
        <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center" }}>
                <TextField 
                    id="standard-basic" 
                    label="Рядов, шт" 
                    variant="standard" 
                    type="number"
                    value={ rowNumber }
                    onChange={ handleRowNumber }
                    sx={{ width: 80 }} />
                <Typography sx={{ marginRight: 1, marginLeft: 1 }}>X</Typography>
                <TextField 
                    id="standard-basic" 
                    label="Мест, шт" 
                    variant="standard"
                    type="number"
                    value={ columnNumber }
                    onChange={ handleColumnNumber }
                    sx={{ width: 80 }} />
            </Box>
            <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <TextField 
                        id="standard-basic" 
                        label="Цена, рублей" 
                        variant="standard" 
                        type="number"
                        onChange={ handleRegularPrice }
                        value={ regularPrice }
                        sx={{ width: 110, marginRight: 3 }} />
                    
                    <TextField 
                        id="standard-basic" 
                        label="Цена, рублей" 
                        variant="standard"
                        type="number"
                        onChange={ handleVipPrice }
                        value={ vipPrice }
                        sx={{ width: 110, marginRight: 3 }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <HallCreateSeat seat={ exSeat } />
                        <Typography marginLeft={1}> - Обычное место</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginY: 2 }}>
                        <HallCreateSeat seat={{ ...exSeat, price: vipPrice, type: "VIP" }} />
                        <Typography marginLeft={1}> - VIP место</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <HallCreateSeat seat={{ ...exSeat, price: vipPrice, type: "disabled" }} />
                        <Typography marginLeft={1}> - Заблокировано</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ alignContent: "center", marginTop: 3 }}>
                <Typography align="center">Для измменения состояния нажмите на место.</Typography>
                <Typography align="center"><b>Первое нажатие:</b> Обычное место.</Typography>
                <Typography align="center"><b>Второе нажатие:</b> VIP место.</Typography>
                <Typography align="center"><b>Третье нажатие:</b> место заблокировано</Typography>
            </Box>
            <Box 
                sx={{ 
                    marginTop: 5,
                    display: "flex",
                    justifyContent: "center"
                }} 
            >
                <Box>
                    <Typography 
                        align="center"
                        marginBottom={2} 
                        sx={{ 
                            width: "auto",
                            paddingX: 2,
                            backgroundColor: "#7E7692",
                            color: "#E6DBFF"
                        }}
                    >
                        Экран
                    </Typography>
                    {
                        seats.map((seatsRow, index) => 
                            <Box key={ index } sx={{ display: "flex", justifyContent: "center" }}>
                                <Typography sx={{ marginRight: 2 }}>{ index+1 }</Typography>
                                <Grid key={ index } container direction="row" sx={{ width: "auto" }}>
                                    {
                                        seatsRow.map((seat, index) => 
                                            <HallCreateSeat key={ index } seat={ seat } onClick={ handleOnSeatClick(seat) } />
                                        )
                                    }
                                </Grid>
                                <Typography sx={{ marginLeft: 2 }}>{ index+1 }</Typography>
                            </Box>
                        )
                    }
                </Box>
            </Box>
            {/* <Button 
                variant="contained"
                sx={{
                    width: "min-content",
                    background: "#FFD22D",
                    color: "#1E1C14",
                    marginTop: 3,
                    '&:hover': {
                        background: "#FBE491"
                    }
                }}
                onClick={ handleSave }
            >
                Сохранить
            </Button> */}
        </Paper>
    );
}

export default HallCreate;