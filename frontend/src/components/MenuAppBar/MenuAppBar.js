import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { 
    AppBar,
    Typography, 
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Box,
    Button,
    Avatar,
    Tooltip
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';

import { logoutMe } from '../../store/actions';
import { getUser } from '../../utils';

const MenuAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = getUser();

    const pages = ["Кинотеатры", "Фильмы"];
    const settings = ["Профиль", 'Выйти'];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleButtons = (type) => {
        switch(type) {
            case "Кинотеатры":
                return () => navigate("/", { replace: true });
            
            case "Фильмы":
                return () => navigate("/movies", { replace: true });

            case "Профиль":
                return () => { 
                    navigate("/me", { replace: true }); 
                    handleCloseUserMenu();
                }
                
            case "Выйти":
                return () => { 
                    dispatch(logoutMe()); 
                    handleCloseUserMenu();
                    navigate("/", { replace: true });
                }
            
            case "Войти":
                return () => navigate("/login", { replace: true });
                    
            case "Зарегистрироваться":
                return () => navigate("/reg", { replace: true });
        }
    }

    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MovieFilterOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CinemaEveryWhere
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleButtons(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <MovieFilterOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CinemaEveryWhere
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleButtons(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {
                        !user &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Button
                                sx={{ my: 2, color: 'white' }}
                                onClick={handleButtons("Войти")}
                            >
                                ВОЙТИ
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white' }}
                                onClick={handleButtons("Зарегистрироваться")}
                            >
                                ЗАРЕГИСТРИРОВАТЬСЯ
                            </Button>
                        </Box>
                    }
                    {
                        user && 
                        <Box sx={{ flexGrow: 0 }}>
                            <Button 
                                sx={{ display: "flex", alignItems: "center" }}
                                onClick={handleOpenUserMenu}
                            >
                                <Avatar sx={{ width: "50px", height: "50px" }} >{ user.firstName[0] }</Avatar>
                                <Typography
                                    sx={{ marginLeft: 1, color: "white" }}
                                >
                                    { user.firstName }
                                </Typography>
                            </Button>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleButtons(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
    </AppBar>
    );
};

export default MenuAppBar;