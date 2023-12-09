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

import { getGenres, createGenre, updateGenre, deleteGenre } from '../../../store/actions';

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const GenresTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteDataSelect, setDeleteDataSelect] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const genres = useSelector(state => state.genres.genres);

    const validationSchema = yup.object({
        name: yup.string().required("Заполните это поле"),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: ""
        },
        onSubmit: (values) => {
            if (selectType == "create") {
                dispatch(
                    createGenre(values["name"])
                );
            }
            else {
                dispatch(
                    updateGenre(values["id"], values["name"])
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
            name: ""
        });
    }

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    const handleCloseUpdate = (e) => {
        setOpenUpdate(false);
        restartFormik();
    }

    const handleCloseDelete = (e) => {
        setOpenDelete(false);
        restartFormik();
    }

    const handleOpenUpdate = (genre) => {
        return (e) => {
            formik.setFieldValue("id", genre.id);
            formik.setFieldValue("name", genre.name);
            setSelectType("update");
            setOpenUpdate(true);
        }
    }

    const handleOpenDelete = (genre) => {
        return (e) => {
            setDeleteDataSelect(genre);
            setOpenDelete(true);
        }
    }

    const handleOpenCreate = (e) => {
        setSelectType("create");
        setOpenUpdate(true);
    }

    const handleDeleteData = (e) => {
        dispatch(deleteGenre(deleteDataSelect.id));
        setOpenDelete(false);
        restartFormik();
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
                Жанры
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Жанр</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {genres.map(genre => (
                            <TableRow
                                key={ genre.id }
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    }
                                }}
                            >
                                <TableCell className={classes.tableCell}>{ genre.id }</TableCell>
                                <TableCell className={classes.tableCell}>{ genre.name }</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenUpdate(genre) }
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
                                        onClick={ handleOpenDelete(genre) }
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

export default GenresTable;