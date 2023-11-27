import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    Grid,
    Paper,
    Box,
    Button,
    Tooltip,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

import HallCreate from "../HallCreate/HallCreate";
import SeanceHallSeat from "../SeanceHallSeat/SeanceHallSeat";

import { getSeatsByHall, saveTicket } from "../../store/actions";

function SeanceHall({ hall, seance_id }) {
    const dispatch = useDispatch();

    const { seats, regularPrice, vipPrice } = useSelector(state => {
        return state.seats
    });

    useEffect(() => {
        dispatch(getSeatsByHall(hall.id));
    }, []);

    let exSeat = {
        row: 0,
        column: 0,
        type: "Обычное",
        price: regularPrice,
        hall_id: hall.id
    }

    const [chosenSeat, setChosenSeat] = useState(null);
    const [openBuy, setOpenBuy] = useState(false);

    const handleOnSeatClick = (seat) => {
        return (e) => {
            if (seat.taken) return;
            if (chosenSeat && chosenSeat.id == seat.id) {
                setChosenSeat(null);
            }
            else{
                setChosenSeat({...seat});
            }
        }
    }

    const buyTicket = (e) => {
        dispatch(saveTicket(seance_id, chosenSeat.id));
        setOpenBuy(false);
    }

    const handleOpenBuy = (e) => {
        setOpenBuy(true);
    }

    const handleCloseBuy = (e) => {
        setOpenBuy(false);
    }

    return (
        <Box 
            sx={{
                display: "flex", 
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: 3
            }}
        >
            <Paper
                sx={{
                    width: "fit-content",
                    padding: "2px",
                    paddingRight: 1,
                    marginTop: 3
                }}
            >
                <Box
                    sx={{
                        display: "flex", 
                        justifyContent: "center"
                    }}
                >
                    <SeanceHallSeat 
                        seat={ exSeat } 
                        chosen={ false }
                    />
                    <Typography marginLeft={1}> - Обычное место <b><span>{ regularPrice } ₽</span></b></Typography>
                </Box>
            </Paper>
            <Paper
                sx={{
                    width: "fit-content",
                    padding: "2px",
                    paddingRight: 1,
                    marginY: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex", 
                        justifyContent: "center"
                    }}
                >
                    <SeanceHallSeat 
                        seat={{ ...exSeat, type: "VIP", price: vipPrice }} 
                        chosen={ false }
                    />
                    <Typography marginLeft={1}> - VIP место <b><span>{ vipPrice } ₽</span></b></Typography>
                </Box>
            </Paper>
            <Paper
                sx={{
                    width: "fit-content",
                    padding: "2px",
                    paddingRight: 1,
                    marginBottom: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex", 
                        justifyContent: "center"
                    }}
                >
                    <SeanceHallSeat 
                        seat={{ ...exSeat, taken: true }} 
                        chosen={ false }
                    />
                    <SeanceHallSeat 
                        seat={{ ...exSeat, type: "VIP", taken: true }} 
                        chosen={ false }
                    />
                    <Typography marginLeft={1}> - Место занято</Typography>
                </Box>
            </Paper>
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
                                        <SeanceHallSeat 
                                            key={ index } 
                                            seat={ seat } 
                                            onClick={ handleOnSeatClick(seat) }
                                            chosen={ chosenSeat && chosenSeat.id == seat.id }
                                        />
                                    )
                                }
                            </Grid>
                            <Typography sx={{ marginLeft: 2 }}>{ index+1 }</Typography>
                        </Box>
                    )
                }
            </Box>
            {
                chosenSeat &&
                <Paper
                    sx={{
                        width: 150,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 1,
                        marginTop: 2,
                        position: "relative"
                    }}
                >
                    <IconButton
                        sx={{
                            width: 30,
                            height: 30,
                            background: "rgba(26, 25, 25, 0.3)",
                            position: "absolute",
                            top: -10,
                            right: -10
                        }}
                        onClick={ () => setChosenSeat(null) }
                    >
                        <ClearIcon></ClearIcon>
                    </IconButton>
                    <Box>
                        <Typography>
                            { `${chosenSeat.row} ряд, ${chosenSeat.column} место` }
                        </Typography>
                        <Typography>
                            { chosenSeat.type }
                        </Typography>
                        <Typography>
                            { chosenSeat.price } ₽
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained"
                        sx={{
                            width: "min-content",
                            background: "#FFD22D",
                            color: "#1E1C14",
                            marginTop: 1,
                            '&:hover': {
                                background: "#FBE491"
                            }
                        }}
                        onClick={ handleOpenBuy }
                    >
                        Купить
                    </Button>
                </Paper>
            }
            {
                chosenSeat &&
                <Dialog
                    open={ openBuy }
                    onClose={ handleCloseBuy }
                >
                    <DialogTitle>
                        Подтверждение покупки
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Выбрано: { `${chosenSeat.row} ряд, ${chosenSeat.column} место` }
                        </Typography>
                        <Typography>
                            К оплате: { chosenSeat.price } ₽
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ handleCloseBuy }>Отмена</Button>
                        <Button onClick={ buyTicket }>Оплатить</Button>
                    </DialogActions>
                </Dialog>
            }
        </Box>
    );
}

export default SeanceHall;