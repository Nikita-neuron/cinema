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

import { getUsers, getRoles, createUser, updateUser, deleteUser } from '../../../store/actions';
import { getUser } from '../../../utils';

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const UsersTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteUserSelect, setDeleteUserSelect] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const roles = useSelector(state => state.roles.roles);

    const users = useSelector(state => state.users.users);
    const loginUser = getUser();

    const validationSchema = yup.object({
        firstName: yup.string().required("Заполните это поле"),
        lastName: yup.string().required("Заполните это поле"),
        email: yup.string().email("Введите корректный email").required("Заполните это поле"),
        password: yup.string(),
        role: yup.number().required("Заполните это поле")
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            firstName: "",
            lastName:"",
            email: "",
            password: "",
            role: ''
        },
        onSubmit: (values) => {
            if (selectType == "create") {
                dispatch(
                    createUser(values["firstName"], values["lastName"], values["email"], values["password"], values["role"])
                );
            }
            else {
                dispatch(
                    updateUser(
                        values["id"], 
                        values["firstName"], 
                        values["lastName"], 
                        values["email"], 
                        values["password"], 
                        values["role"]
                    )
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
            firstName: "",
            lastName:"",
            email: "",
            password: "",
            role: ''
        });
    }

    useEffect(() => {
        dispatch(getUsers());
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

    const handleOpenUpdate = (user) => {
        return (e) => {
            formik.setFieldValue("id", user.id);
            formik.setFieldValue("firstName", user.firstName);
            formik.setFieldValue("lastName", user.lastName);
            formik.setFieldValue("email", user.email);
            formik.setFieldValue("role", user.Role.id);
            setSelectType("update");
            setOpenUpdate(true);
        }
    }

    const handleOpenDelete = (user) => {
        return (e) => {
            setDeleteUserSelect(user);
            setOpenDelete(true);
        }
    }

    const handleOpenCreate = (e) => {
        formik.setFieldValue("role", roles.find(item => item.name == "USER").id);
        setSelectType("create");
        setOpenUpdate(true);
    }

    const handleDeleteUser = (e) => {
        dispatch(deleteUser(deleteUserSelect.id));
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
                Пользователи
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Имя</TableCell>
                            <TableCell className={classes.tableCell}>Фамилия</TableCell>
                            <TableCell className={classes.tableCell}>Email</TableCell>
                            <TableCell className={classes.tableCell}>Роль</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow
                                key={ user.id }
                                sx={{ 
                                    '&:last-child td, &:last-child th': { 
                                        border: 0 
                                    }
                                }}
                            >
                                <TableCell className={classes.tableCell}>{ user.id }</TableCell>
                                <TableCell className={classes.tableCell}>{ user.firstName }</TableCell>
                                <TableCell className={classes.tableCell}>{ user.lastName }</TableCell>
                                <TableCell className={classes.tableCell}>{ user.email }</TableCell>
                                <TableCell className={classes.tableCell}>{ user.Role.name }</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Button
                                        sx={{
                                            backgroundColor: "#368636",
                                            color: "white",
                                            ":hover": {
                                                backgroundColor: "#25B225"
                                            }
                                        }}
                                        onClick={ handleOpenUpdate(user) }
                                        disabled={ loginUser.email == user.email }
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
                                        disabled={ loginUser.email == user.email }
                                        onClick={ handleOpenDelete(user) }
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
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Имя"
                        autoFocus
                        sx={{
                            marginY: 2
                        }}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={ formik.touched.firstName && Boolean(formik.errors.firstName) }
                        helperText={ formik.touched.firstName && formik.errors.firstName }
                    />
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Фамилия"
                        name="lastName"
                        sx={{
                            marginY: 2
                        }}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={ formik.touched.lastName && Boolean(formik.errors.lastName) }
                        helperText={ formik.touched.lastName && formik.errors.lastName }
                    />
                    <TextField
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Почта"
                        name="email"
                        sx={{
                            marginY: 2
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={ formik.touched.email && Boolean(formik.errors.email) }
                        helperText={ formik.touched.email && formik.errors.email }
                    />
                    <TextField
                        required={ selectType == "create" }
                        fullWidth
                        name="password"
                        label={ selectType == "create" ? "Пароль" : "Новый пароль" }
                        type="password"
                        sx={{
                            marginY: 2
                        }}
                        onChange={formik.handleChange}
                        error={ formik.touched.password && Boolean(formik.errors.password) }
                        helperText={ formik.touched.password && formik.errors.password }
                    />
                    <TextField
                        select
                        label="Роль"
                        name="role"
                        required
                        sx={{
                            marginY: 2
                        }}
                        value={ formik.values.role }
                        onChange={formik.handleChange}
                        error={ formik.touched.role && Boolean(formik.errors.role) }
                        helperText={ formik.touched.role && formik.errors.role }
                    >
                        {roles.length && roles.map(role => (
                            <MenuItem key={ role.id } value={ role.id }>
                                { role.name }
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
                deleteUserSelect &&
                <Dialog
                    open={ openDelete }
                    onClose={ handleCloseDelete }
                >
                    <DialogTitle>
                        Удалить пользователя?
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Пользователь: { deleteUserSelect.email }
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ handleCloseDelete }>Отмена</Button>
                        <Button onClick={ handleDeleteUser }>Да</Button>
                    </DialogActions>
                </Dialog>
            }
        </Paper>
    );
};

export default UsersTable;