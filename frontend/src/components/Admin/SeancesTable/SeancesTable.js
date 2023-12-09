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

import { getCinemas, getMovies, getHalls, getSeances, createSeance, updateSeance, deleteSeance } from '../../../store/actions';

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const SeancesTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteDataSelect, setDeleteDataSelect] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const seances = useSelector(state => state.seances.seances);
    const movies = useSelector(state => state.movies.movies);
    const halls = useSelector(state => state.halls.halls);
    const cinemas = useSelector(state => state.cinemas.cinemas);

    const validationSchema = yup.object({
        begin: yup.date().required("Заполните это поле"),
        movie_id: yup.number().required("Заполните это поле"),
        hall_id: yup.number().required("Заполните это поле"),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            begin: new Date().toISOString().substring(0, 19),
            movie_id: '',
            hall_id: ''
        },
        onSubmit: (values) => {
            if (selectType == "create") {
                dispatch(
                    createSeance(values["begin"], values["movie_id"], values["hall_id"])
                );
            }
            else {
                dispatch(
                    updateSeance(values["id"], values["begin"], values["movie_id"], values["hall_id"])
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
            begin: new Date().toISOString().substring(0, 19),
            movie_id: '',
            hall_id: ''
        });
    }

    useEffect(() => {
        dispatch(getSeances());
        dispatch(getMovies());
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

    const handleOpenUpdate = (seance) => {
        return (e) => {
            formik.setFieldValue("id", seance.id);
            formik.setFieldValue("begin", seance.begin);
            formik.setFieldValue("movie_id", seance.movie_id);
            formik.setFieldValue("hall_id", seance.hall_id);
            setSelectType("update");
            setOpenUpdate(true);
        }
    }

    const handleOpenDelete = (seance) => {
        return (e) => {
            setDeleteDataSelect(seance);
            setOpenDelete(true);
        }
    }

    const handleOpenCreate = (e) => {
        setSelectType("create");
        setOpenUpdate(true);
    }

    const handleDeleteData = (e) => {
        dispatch(deleteSeance(deleteDataSelect.id));
        setOpenDelete(false);
        restartFormik();
    }

    const getHallCinema = (hall_id) => {
        let hall = halls.find(item => item.id == hall_id)
        let hall_name = hall.name;
        let cinema_name = cinemas.find(item => item.id == hall.cinema_id).name;

        return `${cinema_name}: ${hall_name}`
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
                Сеансы
            </Typography>
            { seances.length && movies.length && halls.length && cinemas.length &&
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Дата и время начала</TableCell>
                            <TableCell className={classes.tableCell}>Фильм</TableCell>
                            <TableCell className={classes.tableCell}>Зал</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {seances.map(seance => (
                            <TableRow
                                key={ seance.id }
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    }
                                }}
                            >
                                <TableCell className={classes.tableCell}>{ seance.id }</TableCell>
                                <TableCell className={classes.tableCell}>{ seance.begin }</TableCell>
                                <TableCell className={classes.tableCell}>{ movies.find(item => item.id == seance.movie_id).title }</TableCell>
                                <TableCell className={classes.tableCell}>{ getHallCinema(seance.hall_id) }
                                    </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenUpdate(seance) }
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
                                        onClick={ handleOpenDelete(seance) }
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
                        name="begin"
                        required
                        fullWidth
                        id="begin"
                        label="Дата начала"
                        type='datetime-local'
                        sx={{
                            marginY: 2
                        }}
                        value={formik.values.begin}
                        onChange={formik.handleChange}
                        error={ formik.touched.begin && Boolean(formik.errors.begin) }
                        helperText={ formik.touched.begin && formik.errors.begin }
                    />
                    <TextField
                        select
                        label="Зал"
                        name="hall_id"
                        fullWidth
                        required
                        sx={{
                            marginY: 2
                        }}
                        value={ formik.values.hall_id }
                        onChange={formik.handleChange}
                        error={ formik.touched.hall_id && Boolean(formik.errors.hall_id) }
                        helperText={ formik.touched.hall_id && formik.errors.hall_id }
                    >
                        {halls.length && cinemas.length && halls.map(hall => (
                            <MenuItem key={ hall.id } value={ hall.id }>
                                { getHallCinema(hall.id) }
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Фильм"
                        name="movie_id"
                        fullWidth
                        required
                        sx={{
                            marginY: 2
                        }}
                        value={ formik.values.movie_id }
                        onChange={formik.handleChange}
                        error={ formik.touched.movie_id && Boolean(formik.errors.movie_id) }
                        helperText={ formik.touched.movie_id && formik.errors.movie_id }
                    >
                        {movies.length && movies.map(movie => (
                            <MenuItem key={ movie.id } value={ movie.id }>
                                { movie.title }
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
                        Удалить сеанс?
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Время: { deleteDataSelect.begin }
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

export default SeancesTable;