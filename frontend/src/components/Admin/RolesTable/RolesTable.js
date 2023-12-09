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

import { getRoles, createRole, updateRole, deleteRole } from '../../../store/actions';

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const RolesTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteDataSelect, setDeleteDataSelect] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const roles = useSelector(state => state.roles.roles);

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
                    createRole(values["name"])
                );
            }
            else {
                dispatch(
                    updateRole(values["id"], values["name"])
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
        dispatch(getRoles());
    }, []);

    const handleCloseUpdate = (e) => {
        setOpenUpdate(false);
        restartFormik();
    }

    const handleCloseDelete = (e) => {
        setOpenDelete(false);
        restartFormik();
    }

    const handleOpenUpdate = (role) => {
        return (e) => {
            formik.setFieldValue("id", role.id);
            formik.setFieldValue("name", role.name);
            setSelectType("update");
            setOpenUpdate(true);
        }
    }

    const handleOpenDelete = (role) => {
        return (e) => {
            setDeleteDataSelect(role);
            setOpenDelete(true);
        }
    }

    const handleOpenCreate = (e) => {
        setSelectType("create");
        setOpenUpdate(true);
    }

    const handleDeleteData = (e) => {
        dispatch(deleteRole(deleteDataSelect.id));
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
                Роли
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Роль</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map(role => (
                            <TableRow
                                key={ role.id }
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    }
                                }}
                            >
                                <TableCell className={classes.tableCell}>{ role.id }</TableCell>
                                <TableCell className={classes.tableCell}>{ role.name }</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenUpdate(role) }
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
                                        onClick={ handleOpenDelete(role) }
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
                        label="Роль"
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
                        Удалить роль?
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Роль: { deleteDataSelect.name }
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

export default RolesTable;