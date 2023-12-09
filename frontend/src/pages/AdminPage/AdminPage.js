import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { 
    Typography,
    Container,
    Box
} from '@mui/material';

import UsersTable from '../../components/Admin/UsersTable/UsersTable';
import RolesTable from '../../components/Admin/RolesTable/RolesTable';
import MoviesTable from '../../components/Admin/MoviesTable/MoviesTable';
import GenresTable from '../../components/Admin/GenresTable/GenresTable';
import CinemasTable from '../../components/Admin/CinemasTable.js/CinemasTable';
import HallsTable from '../../components/Admin/HallsTable/HallsTable';
import SeancesTable from '../../components/Admin/SeancesTable/SeancesTable';
import TicketsTable from '../../components/Admin/TicketsTable/TicketsTable';

import { getMeIsAdmin } from '../../store/actions/users';

const AdminPage = () => {
    const dispatch = useDispatch();

    const isAdmin = useSelector(state => {
        return state.users.isAdmin
    });

    useEffect(() => {
        dispatch(getMeIsAdmin());
    }, []);

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Typography
                variant='h4'
                sx={{
                    marginBottom: 2
                }}
            >
                Панель администратора
            </Typography>
            {
                !isAdmin &&
                <img src='./img/jurassic-park-wayne-knight.gif'></img>
            }
            {
                isAdmin && 
                <Box>
                    <UsersTable />
                    <RolesTable />
                    <MoviesTable />
                    <GenresTable />
                    <CinemasTable />
                    <HallsTable />
                    <SeancesTable />
                    <TicketsTable />
                </Box>
            }
        </Container>
    );
};

export default AdminPage;