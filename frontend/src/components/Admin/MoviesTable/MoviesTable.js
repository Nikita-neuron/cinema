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
    IconButton,
    Collapse,
    Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { getMovies, createMovie, updateMovie, deleteMovie } from '../../../store/actions';

// https://mui.com/material-ui/react-table/#collapsible-table

function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
}
  
function Row({ movie, handleOpenUpdate, handleOpenDelete }) {
    console.log(movie);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
  
    return (
        <Box>
            <TableRow 
                sx={{ 
                    '& > *': { 
                        borderBottom: 'unset' 
                    } 
                }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell}>{ movie.id }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.title }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.description }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.premiere }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.actors }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.duration }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.country }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.year }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.coef }</TableCell>
                <TableCell className={classes.tableCell}>{ movie.status }</TableCell>
                <TableCell className={classes.tableCell}>
                    {
                        movie.genres.map(genre => {
                            <Typography key={ genre.id }>{ genre.name }</Typography>
                        })
                    }
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
                        onClick={ handleOpenUpdate(movie) }
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
                        onClick={ handleOpenDelete(movie) }
                    >
                        Удалить
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        History
                    </Typography>
                        Hello
                    </Box>
                </Collapse>
            </TableRow>
      </Box>
    );
  }
  
// Row.propTypes = {
//     row: PropTypes.shape({
//       calories: PropTypes.number.isRequired,
//       carbs: PropTypes.number.isRequired,
//       fat: PropTypes.number.isRequired,
//       history: PropTypes.arrayOf(
//         PropTypes.shape({
//           amount: PropTypes.number.isRequired,
//           customerId: PropTypes.string.isRequired,
//           date: PropTypes.string.isRequired,
//         }),
//       ).isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       protein: PropTypes.number.isRequired,
//     }).isRequired,
//   };
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  ];

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center"
    }
});

const MoviesTable = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteDataSelect, setDeleteDataSelect] = useState(null);
    const [selectType, setSelectType] = useState(null);
    let error = null;

    const movies = useSelector(state => state.movies.movies);

    const validationSchema = yup.object({
        title: yup.string().required("Заполните это поле"),
        description: yup.string().required("Заполните это поле"),
        premiere: yup.date().required("Заполните это поле"),
        producer: yup.string().required("Заполните это поле"),
        actors: yup.string().required("Заполните это поле"),
        duration: yup.number().min(1).required("Заполните это поле"),
        country: yup.string().required("Заполните это поле"),
        year: yup.number().min(1).required("Заполните это поле"),
        coef: yup.number().min(1).required("Заполните это поле"),
        status: yup.string().required("Заполните это поле"),
        genres_id: yup.array().required("Заполните это поле"),
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            title: "",
            description: "",
            premiere: "",
            producer: "",
            actors: "",
            duration: 0,
            country: "",
            year: "",
            coef: 1,
            status: "",
            genres_id: []
        },
        onSubmit: (values) => {
            if (selectType == "create") {
                dispatch(
                    createMovie(
                        values["title"],
                        values["description"],
                        values["premiere"],
                        values["producer"],
                        values["actors"],
                        values["duration"],
                        values["country"],
                        values["year"],
                        values["coef"],
                        values["status"],
                        values["genres_id"]
                    )
                );
            }
            else {
                dispatch(
                    updateMovie(
                        values["id"],
                        values["title"],
                        values["description"],
                        values["premiere"],
                        values["producer"],
                        values["actors"],
                        values["duration"],
                        values["country"],
                        values["year"],
                        values["coef"],
                        values["status"],
                        values["genres_id"]
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
            title: "",
            description: "",
            premiere: "",
            producer: "",
            actors: "",
            duration: 0,
            country: "",
            year: "",
            coef: 1,
            status: "",
            genres_id: []
        });
    }

    useEffect(() => {
        dispatch(getMovies());
    }, []);

    const handleCloseUpdate = (e) => {
        setOpenUpdate(false);
        restartFormik();
    }

    const handleCloseDelete = (e) => {
        setOpenDelete(false);
        restartFormik();
    }

    const handleOpenUpdate = (movie) => {
        return (e) => {
            formik.setFieldValue("id", movie.id);
            formik.setFieldValue("title", movie.title);
            formik.setFieldValue("description", movie.description);
            formik.setFieldValue("premiere", movie.premiere);
            formik.setFieldValue("actors", movie.actors);
            formik.setFieldValue("duration", movie.duration);
            formik.setFieldValue("country", movie.country);
            formik.setFieldValue("year", movie.year);
            formik.setFieldValue("coef", movie.coef);
            formik.setFieldValue("status", movie.status);
            formik.setFieldValue("genres_id", movie.genres_id);
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
        dispatch(deleteMovie(deleteDataSelect.id));
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
                Фильмы
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>ID</TableCell>
                            <TableCell className={classes.tableCell}>Название</TableCell>
                            <TableCell className={classes.tableCell}>Описание</TableCell>
                            <TableCell className={classes.tableCell}>Премьера</TableCell>
                            <TableCell className={classes.tableCell}>Актеры</TableCell>
                            <TableCell className={classes.tableCell}>Длительность</TableCell>
                            <TableCell className={classes.tableCell}>Страна</TableCell>
                            <TableCell className={classes.tableCell}>Год</TableCell>
                            <TableCell className={classes.tableCell}>Коэффициент</TableCell>
                            <TableCell className={classes.tableCell}>Статус</TableCell>
                            <TableCell className={classes.tableCell}>Жанры</TableCell>
                            <TableCell className={classes.tableCell}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map(movie => (
                            <Typography>{ movie.id }</Typography>
                            // <Row 
                            //     key={ movie.id } 
                            //     movie={ movie } 
                            //     handleOpenUpdate={ handleOpenUpdate }
                            //     handleOpenDelete={ handleCloseDelete }
                            // />
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

export default MoviesTable;