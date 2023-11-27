import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Alert
} from "@mui/material"

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { login, getCinemas } from "../../store/actions";

function SignInPage() {
    const dispatch = useDispatch();

    const { isAuthenticated, error } = useSelector(state => {
        return state.auth;
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        dispatch(login(data.get("email"), data.get("password")));
    };

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
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, alignItems: "center" }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {
                        error && 
                        <Alert severity="error">
                            { error }
                        </Alert>
                    }
                    {
                        isAuthenticated &&
                        <Alert severity="success">
                            Вход выполнен!
                        </Alert>
                    }
                    {
                        isAuthenticated &&
                        <Navigate to={ `/` } replace={true}/>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                    <Box
                        component="div"
                        display="flex"
                        justifyContent="center"
                    >
                        <Button href="/reg">
                            Регистрация
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SignInPage;