import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { 
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Alert,
    MenuItem
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { getMovies, getUsers, getSeances, getHalls, getSeats, getTickets, createTicket, updateTicket, deleteTicket, getCinemas } from '../../../store/actions';

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const TicketsTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteDataSelect, setDeleteDataSelect] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const tickets = useSelector(state => state.tickets.allTickets);
    const movies = useSelector(state => state.movies.movies);
    const users = useSelector(state => state.users.users);
    const halls = useSelector(state => state.halls.halls);
    const seats = useSelector(state => state.seats.allSeats);
    const seances = useSelector(state => state.seances.seances);
    const cinemas = useSelector(state => state.cinemas.cinemas);

    const validationSchema = yup.object({
        seance_id: yup.number().required("Заполните это поле"),
        seat_id: yup.number().required("Заполните это поле"),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            seance_id: '',
            seat_id: ''
        },
        onSubmit: (values) => {
            if (selectType == "create") {
                dispatch(
                    createTicket(values["seance_id"], values["seat_id"])
                );
            }
            else {
                dispatch(
                    updateTicket(values["id"], values["seance_id"], values["seat_id"])
                );
            }
            setOpenUpdate(false);
            restartFormik();
        },
        validationSchema: validationSchema
    });

    const restartFormik = () => {
        formik.resetForm({
            id: 0,
            seance_id: '',
            seat_id: ''
        });
    }

    useEffect(() => {
        dispatch(getTickets());
        dispatch(getSeances());
        dispatch(getSeats());
        dispatch(getHalls());
        dispatch(getUsers());
        dispatch(getCinemas());
    }, []);

    const handleCloseUpdate = (e) => {
        setOpenUpdate(false);
        restartFormik();
    }

    const handleCloseDelete = (e) => {
        setOpenDelete(false);
        restartFormik();
    }

    const handleOpenUpdate = (ticket) => {
        return (e) => {
            formik.setFieldValue("id", ticket.id);
            formik.setFieldValue("seance_id", ticket.seance_id);
            formik.setFieldValue("seat_id", ticket.seat_id);
            setSelectType("update");
            setOpenUpdate(true);
        }
    }

    const handleOpenDelete = (ticket) => {
        return (e) => {
            setDeleteDataSelect(ticket);
            setOpenDelete(true);
        }
    }

    const handleOpenCreate = (e) => {
        setSelectType("create");
        setOpenUpdate(true);
    }

    const handleDeleteData = (e) => {
        dispatch(deleteTicket(deleteDataSelect.id));
        setOpenDelete(false);
        restartFormik();
    }

    const getMovie = (ticket) => {
        let seance = seances.find(item => item.id == ticket.seance_id);
        let movie = movies.find(item => item.id == seance.movie_id);
        return movie;
    }

    const getHallCinema = (ticket) => {
        let seance = seances.find(item => item.id == ticket.seance_id);
        let hall = halls.find(item => item.id == seance.hall_id);
        let cinema = cinemas.find(item => item.id == hall.cinema_id);

        return `${cinema.name}: ${hall.name}`;
    }

    const getSeat = (ticket) => {
        let seat = seats.find(item => item.id == ticket.seat_id);
        return `${seat.row} ряд, ${seat.column} место`
    }

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                padding: 3,
                marginBottom: 2
            }}
        >
            <Typography
                variant='h5'
                sx={{
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 1
                }}
            >
                Билеты
            </Typography>
            { tickets.length && movies.length && users.length && halls.length && seats.length && seances.length && cinemas.length &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Дата покупки</TableCell>
                            <TableCell className={classes.tableCell}>Email</TableCell>
                            <TableCell className={classes.tableCell}>Фильм</TableCell>
                            <TableCell className={classes.tableCell}>Зал</TableCell>
                            <TableCell className={classes.tableCell}>Место</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map(ticket => (
                            <TableRow
                                key={ ticket.id }
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    }
                                }}
                            >
                                <TableCell className={classes.tableCell}>{ ticket.id }</TableCell>
                                <TableCell className={classes.tableCell}>{ ticket.buy_date }</TableCell>
                                <TableCell className={classes.tableCell}>{ users.find(item => item.id == ticket.user_id).email }</TableCell>
                                <TableCell className={classes.tableCell}>{ getMovie(ticket).title }</TableCell>
                                <TableCell className={classes.tableCell}>{ getHallCinema(ticket) }</TableCell>
                                <TableCell className={classes.tableCell}>{ getSeat(ticket) }</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenUpdate(ticket) }
                                    >
                                        Обновить
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "#E31712",
                                            color: "white",
                                            marginLeft: 1,
                                            ":hover": {
                                                backgroundColor: "#F14F4B"
                                            }
                                        }}
                                        onClick={ handleOpenDelete(ticket) }
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <Button
                sx={{
                    backgroundColor: "#E3DE00",
                    color: "black",
                    marginTop: 1,
                    ":hover": {
                        backgroundColor: "#F1ED3C"
                    }
                }}
                onClick={ handleOpenCreate }
            >
                Создать
            </Button>
            <Dialog 
                open={openUpdate}
                onClose={handleCloseUpdate}
            >
                <DialogTitle>Изменение / Создание</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Жанр"
                        autoFocus
                        sx={{
                            marginY: 2
                        }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={ formik.touched.name && Boolean(formik.errors.name) }
                        helperText={ formik.touched.name && formik.errors.name }
                    />
                    {
                        error && 
                        <Alert severity="error">
                            { error.error }
                        </Alert>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate}>Отмена</Button>
                    <Button onClick={formik.handleSubmit}>Сохранить</Button>
                </DialogActions>
            </Dialog>
            {
                deleteDataSelect &&
                <Dialog
                    open={ openDelete }
                    onClose={ handleCloseDelete }
                >
                    <DialogTitle>
                        Удалить жанр?
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Жанр: { deleteDataSelect.name }
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ handleCloseDelete }>Отмена</Button>
                        <Button onClick={ handleDeleteData }>Да</Button>
                    </DialogActions>
                </Dialog>
            }
        </Paper>
    );
};

export default TicketsTable;