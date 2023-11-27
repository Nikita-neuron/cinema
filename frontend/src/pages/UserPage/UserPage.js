import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { deleteTicket, getUserMe, getUserTickets, updateMe } from "../../store/actions";
import { 
    Avatar, 
    Container, 
    Paper,
    Box,
    Typography,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Alert
} from "@mui/material";

import TicketCard from "../TicketCard/TicketCard";

function UserPage() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    let error = null;

    const user = useSelector(state => state.users.user );
    const tickets = useSelector(state => state.tickets.tickets);

    const validationSchema = yup.object({
        firstName: yup.string().required("Заполните это поле"),
        lastName: yup.string().required("Заполните это поле"),
        email: yup.string().email("Введите корректный email").required("Заполните это поле")
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName:"",
            email: ""
        },
        onSubmit: (values) => {
            dispatch(updateMe(values["firstName"], values["lastName"], values["email"]));
            setOpen(false);
        },
        validationSchema: validationSchema
    });

    useEffect(() => {
        dispatch(getUserMe());
        dispatch(getUserTickets());
    }, []);

    useEffect(() => {
        if (user) {
            formik.setFieldValue("firstName", user.firstName);
            formik.setFieldValue("lastName", user.lastName);
            formik.setFieldValue("email", user.email);
        }
    }, [user]);

    const handleDelete = (ticket) => {
        return (e) => {
            dispatch(deleteTicket(ticket.id));
            window.location.reload();
        }
    }

    const handleClose = (e) => {
        setOpen(false);
    }

    const handleOpen = (e) => {
        setOpen(true);
    }
    
    return (
        <Container>
            {
                user &&
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                <Paper
                    sx={{
                        width: "min-content",
                        padding: 7
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 2
                        }}
                    >
                        <Avatar sx={{ width: "50px", height: "50px" }} >{ user.firstName[0] }</Avatar>
                        <Typography
                            sx={{
                                marginLeft: 2,
                                fontSize: "1em",
                                paddingTop: "3px"
                            }}
                            variant="h5"
                        >
                            { `${user.lastName} ${user.firstName}` }
                        </Typography>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                fontSize: "1em",
                                alignItems: "center"
                            }}
                        >
                            <Typography
                                sx={{
                                    marginRight: 2
                                }}
                                variant="h5"
                            >
                                Email:
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1em",
                                    paddingTop: "3px"
                                }}
                            >
                                { user.email }
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={ handleOpen }
                        >
                            Изменить данные
                        </Button>
                    </Box>
                </Paper>
                <Container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: 3
                    }}
                >
                    <Typography variant="h4">Ваши билеты:</Typography>
                    {
                        tickets.length == 0 &&
                        <Typography sx={{ marginTop: 1, color: "#505050" }} >Билетов нет</Typography>
                    }
                    {
                        <Grid container justifyContent="center" spacing={ 2 }>
                            {
                                tickets.map(ticket=> {
                                    return (
                                        <Grid key={ ticket.id } item>
                                            <TicketCard ticket={ ticket } handleDelete={ handleDelete(ticket) } />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    }
                </Container>
                <Dialog 
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Изменение данных</DialogTitle>
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
                        {
                            error && 
                            <Alert severity="error">
                                { error.error }
                            </Alert>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button onClick={formik.handleSubmit}>Сохранить</Button>
                    </DialogActions>
                </Dialog>
                </Container>
            }
        </Container>
    );
}

export default UserPage;