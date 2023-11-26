import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import Grid from '@mui/material/Grid';

import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Alert,
    Link
} from "@mui/material"

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { registration } from "../../store/actions";

function SignUpPage() {
    const validationSchema = yup.object({
        firstName: yup.string().required("Заполните это поле"),
        lastName: yup.string().required("Заполните это поле"),
        email: yup.string().email("Введите корректный email").required("Заполните это поле"),
        password: yup.string().min(8, "Пароль должен содержать минимум 8 символов").required("Заполните это поле")
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            dispatch(registration(values["firstName"], values["lastName"], values["email"], values["password"]));
        },
        validationSchema: validationSchema
    });

    const dispatch = useDispatch();

    const { isAuthenticated, error } = useSelector(state => {
        return state.auth;
    });

    return (
        <Container component="div" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" noValidate onSubmit={ formik.handleSubmit } sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Имя"
                                autoFocus
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={ formik.touched.firstName && Boolean(formik.errors.firstName) }
                                helperText={ formik.touched.firstName && formik.errors.firstName }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={ formik.touched.lastName && Boolean(formik.errors.lastName) }
                                helperText={ formik.touched.lastName && formik.errors.lastName }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Почта"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={ formik.touched.email && Boolean(formik.errors.email) }
                                helperText={ formik.touched.email && formik.errors.email }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={ formik.touched.password && Boolean(formik.errors.password) }
                                helperText={ formik.touched.password && formik.errors.password }
                            />
                        </Grid>
                        <Grid item xs={12}>
                        {
                            error && 
                            <Alert severity="error">
                                { error.error }
                            </Alert>
                        }
                        {
                            isAuthenticated &&
                            <Alert severity="success">
                                Регистрация прошла успешно!
                            </Alert>
                        }
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Регистрация
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Уже есть аккаунт? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUpPage;