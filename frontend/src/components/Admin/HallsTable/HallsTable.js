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

import HallCreate from '../HallCreate/HallCreate';

import { getCinemas, getHalls, createHall, updateHall, deleteHall, saveSeatsByHall } from '../../../store/actions';

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const HallsTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openHallSeats, setOpenHallSeats] = useState(false);
    const [deleteDataSelect, setDeleteDataSelect] = useState(null);
    const [selectedHall, setselectedHall] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const halls = useSelector(state => state.halls.halls);
    const cinemas = useSelector(state => state.cinemas.cinemas);
    const seats = useSelector(state => state.seats.seats);

    const validationSchema = yup.object({
        name: yup.string().required("Заполните это поле"),
        cinema_id: yup.number().required("Заполните это поле")
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: "",
            cinema_id: ''
        },
        onSubmit: (values) => {
            if (selectType == "create") {
                dispatch(
                    createHall(values["name"], values["cinema_id"])
                );
            }
            else {
                dispatch(
                    updateHall(values["id"], values["name"], values["cinema_id"])
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
            name: "",
            cinema_id: ''
        });
    }

    useEffect(() => {
        dispatch(getHalls());
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

    const handleOpenUpdate = (hall) => {
        return (e) => {
            formik.setFieldValue("id", hall.id);
            formik.setFieldValue("name", hall.name);
            formik.setFieldValue("cinema_id", hall.cinema_id);
            setSelectType("update");
            setOpenUpdate(true);
        }
    }

    const handleOpenDelete = (hall) => {
        return (e) => {
            setDeleteDataSelect(hall);
            setOpenDelete(true);
        }
    }

    const handleOpenCreate = (e) => {
        setSelectType("create");
        setOpenUpdate(true);
    }

    const handleDeleteData = (e) => {
        dispatch(deleteHall(deleteDataSelect.id));
        setOpenDelete(false);
        restartFormik();
    }

    const handleOpenHallSeats = (hall) => {
        return (e) => {
            setselectedHall(hall);
            setOpenHallSeats(true);
        }
    }

    const handleCloseHallSeats = (e) => {
        setOpenHallSeats(false);
    }

    const handleSaveHallSeats = (e) => {
        dispatch(saveSeatsByHall(seats.flat(), selectedHall.id));
        setOpenHallSeats(false);
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
                Залы
            </Typography>
            { halls.length && cinemas.length && seats.length &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Название</TableCell>
                            <TableCell className={classes.tableCell}>Кинотеатр</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {halls.map(hall => (
                            <TableRow
                                key={ hall.id }
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    }
                                }}
                            >
                                <TableCell className={classes.tableCell}>{ hall.id }</TableCell>
                                <TableCell className={classes.tableCell}>{ hall.name }</TableCell>
                                <TableCell className={classes.tableCell}>{ cinemas.find(item => item.id == hall.cinema_id).name }</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenHallSeats(hall) }
                                    >
                                        Места
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            marginLeft: 1,
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenUpdate(hall) }
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
                                        onClick={ handleOpenDelete(hall) }
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
                        label="Название"
                        autoFocus
                        sx={{
                            marginY: 2
                        }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={ formik.touched.name && Boolean(formik.errors.name) }
                        helperText={ formik.touched.name && formik.errors.name }
                    />
                    <TextField
                        select
                        label="Кинотеатр"
                        name="cinema_id"
                        fullWidth
                        required
                        sx={{
                            marginY: 2
                        }}
                        value={ formik.values.cinema_id }
                        onChange={formik.handleChange}
                        error={ formik.touched.cinema_id && Boolean(formik.errors.cinema_id) }
                        helperText={ formik.touched.cinema_id && formik.errors.cinema_id }
                    >
                        {cinemas.length && cinemas.map(cinema => (
                            <MenuItem key={ cinema.id } value={ cinema.id }>
                                { cinema.name }
                            </MenuItem>
                        ))}
                    </TextField>
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
                        Удалить зал?
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Зал: { deleteDataSelect.name }
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ handleCloseDelete }>Отмена</Button>
                        <Button onClick={ handleDeleteData }>Да</Button>
                    </DialogActions>
                </Dialog>
            }
            <Dialog
                    open={ openHallSeats }
                    onClose={ handleCloseHallSeats }
                >
                    <DialogTitle>
                        Схема зала
                    </DialogTitle>
                    <DialogContent>
                        <HallCreate hall={ selectedHall } />
                    </DialogContent>
                    <DialogActions
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: 1
                        }}
                    >
                        <Button onClick={ handleCloseHallSeats }>Отмена</Button>
                        <Button 
                            variant="contained"
                            sx={{
                                width: "min-content",
                                background: "#FFD22D",
                                color: "#1E1C14",
                                '&:hover': {
                                    background: "#FBE491"
                                }
                            }}
                            onClick={ handleSaveHallSeats }
                        >
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
        </Paper>
    );
};

export default HallsTable;