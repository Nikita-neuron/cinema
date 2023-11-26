import React, { useState, useEffect } from "react";

import { 
    Grid,
    Box,
    Button,
    Tooltip,
    Typography,
    Paper,
    TextField
} from "@mui/material";
import { styled } from '@mui/material/styles';

import HallCreateSeat from "../HallCreateSeat/HallCreateSeat";

function HallCreate({ hall }) {
    const seats = hall.Seats;
    // console.log(seats);

    const [rowNumber, setRowNumber] = useState(1);
    const [columnNumber, setColumnNumber] = useState(1);

    const [regularPrice, setRegularPrice] = useState(1);
    const [vipPrice, setVipPrice] = useState(1);

    let regularSeat = {
        "row": 0,
        "column": 0,
        "type": "Обычное",
        "price": regularPrice,
        "hall_id": hall.id
    }

    let vipSeat = {
        "row": 0,
        "column": 0,
        "type": "VIP",
        "price": vipPrice,
        "hall_id": hall.id
    }

    let disableSeat = {
        "row": 0,
        "column": 0,
        "type": "disabled",
        "price": 1,
        "hall_id": hall.id
    }

    let firstSeat = {
        "row": 1,
        "column": 1,
        "type": "Обычное",
        "price": regularPrice,
        "hall_id": hall.id
    }

    const [seatsMatrix, setSeatsMatrix] = useState([[firstSeat]]);

    useEffect(() => {
        let matrix = seatsMatrix

        matrix = matrix.slice(0, rowNumber);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = matrix[i].slice(0, columnNumber);
        }

        for (let i = matrix.length; i < rowNumber; i++) {
            matrix[i] = [];
            for (let j = 0; j < columnNumber; j++) {
                matrix[i][j] = {
                    "row": i + 1,
                    "column": j + 1,
                    "type": "Обычное",
                    "price": regularPrice,
                    "hall_id": hall.id
                }
            }
        }
        for (let j = matrix[0].length; j < columnNumber; j++) {
            for (let i = 0; i < rowNumber; i++) {
                matrix[i][j] = {
                    "row": i + 1,
                    "column": j + 1,
                    "type": "Обычное",
                    "price": regularPrice,
                    "hall_id": hall.id
                }
            }
        }
        setSeatsMatrix(matrix);
    }, [rowNumber, columnNumber]);

    useEffect(() => {
        let matrix = seatsMatrix;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].type == "Обычное") {
                    matrix[i][j].price = regularPrice;
                }
                else if (matrix[i][j].type == "VIP") {
                    matrix[i][j].price = vipPrice;
                }
            }
        }
        console.log(regularPrice, vipPrice);
        setSeatsMatrix(matrix);
    }, [regularPrice, vipPrice]);

    const handleRowNumber = (e) => {
        let value = e.target.value;
        if (value <= 0) return;

        setRowNumber(value);
    }

    const handleColumnNumber = (e) => {
        let value = e.target.value;
        if (value <= 0) return;

        setColumnNumber(value);
    }

    const handleRegularPrice = (e) => {
        let value = e.target.value;
        if (value <= 0) return;

        setRegularPrice(value);
    }

    const handleVipPrice = (e) => {
        let value = e.target.value;
        if (value <= 0) return;

        setVipPrice(value);
    }

    return (
        <Paper sx={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
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
            <Box sx={{ marginTop: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                    <TextField 
                        id="standard-basic" 
                        label="Цена, рублей" 
                        variant="standard" 
                        type="number"
                        onChange={ handleRegularPrice }
                        value={ regularPrice }
                        sx={{ width: 110, marginRight: 3 }} />
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <HallCreateSeat seat={ regularSeat } />
                        <Typography marginLeft={1}> - Обычное место</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", marginTop: 3 }}>
                    <TextField 
                        id="standard-basic" 
                        label="Цена, рублей" 
                        variant="standard"
                        type="number"
                        onChange={ handleVipPrice }
                        value={ vipPrice }
                        sx={{ width: 110, marginRight: 3 }} />
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <HallCreateSeat seat={ vipSeat } />
                        <Typography marginLeft={1}> - VIP место</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 17, marginTop: 3 }}>
                    <HallCreateSeat seat={ disableSeat } />
                    <Typography marginLeft={1}> - Заблокировано</Typography>
                </Box>
            </Box>
            <Box sx={{ marginTop: 5 }} >
                <Typography 
                    align="center"
                    marginBottom={2} 
                    sx={{  }}
                >
                    Экран
                </Typography>
                {
                    seatsMatrix.map((seatsRow, index) => 
                        <Box key={ index } sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography sx={{ marginRight: 2 }}>{ index+1 }</Typography>
                            <Grid key={ index } container direction="row" sx={{ width: "auto" }}>
                                {
                                    seatsRow.map((seat, index) => 
                                        <HallCreateSeat key={ index } seat={ seat } />
                                    )
                                }
                            </Grid>
                            <Typography sx={{ marginLeft: 2 }}>{ index+1 }</Typography>
                        </Box>
                    )
                }
            </Box>
        </Paper>
    );
}

export default HallCreate;