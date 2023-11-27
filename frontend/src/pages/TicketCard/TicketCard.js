import React, { useEffect, useState } from "react";

import { 
    Paper, 
    Typography,
    Box,
    Link,
    Button,
    Dialog,
    DialogTitle,
    DialogActions
} from "@mui/material";

function TicketCard({ ticket, handleDelete }) {
    const [open, setOpen] = useState(false);

    const handleClose = (e) => {
        setOpen(false);
    }

    const handleOpen = (e) => {
        setOpen(true);
    }

    return (
        <Paper
            sx={{
                padding: 2,
                width: "max-content",
                margin: 2
            }}
        >
            {
                ticket &&
                <Box>
                    <Typography 
                        variant="h4"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        Билет
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                marginRight: 2
                            }}
                            variant="h5"
                        >
                            Кинотеатр:
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14pt",
                                paddingTop: "3px"
                            }}
                        >
                            <Link href={ `/cinema/${ticket.Seance.Hall.Cinema.id}` }>
                                { ticket.Seance.Hall.Cinema.name }
                            </Link>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                marginRight: 2
                            }}
                            variant="h5"
                        >
                            Фильм:
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14pt",
                                paddingTop: "3px"
                            }}
                        >
                            <Link href={ `/movie/${ticket.Seance.Movie.id}` }>
                                { ticket.Seance.Movie.title }
                            </Link>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                marginRight: 2
                            }}
                            variant="h5"
                        >
                            Время:
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14pt",
                                paddingTop: "3px"
                            }}
                        >
                            { ticket.Seance.begin }
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                marginRight: 2
                            }}
                            variant="h5"
                        >
                            Место:
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14pt",
                                paddingTop: "3px"
                            }}
                        >
                            { `${ticket.Seat.row} ряд, ${ticket.Seat.column} место` }
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                marginRight: 2
                            }}
                            variant="h5"
                        >
                            Тип:
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14pt",
                                fontWeight: 600,
                                paddingTop: "3px"
                            }}
                        >
                            { ticket.Seat.type }
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#D21800",
                                '&:hover': {
                                    backgroundColor: "#891000"
                                }
                            }}
                            onClick={ handleOpen }
                        >
                            Отменить
                        </Button>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>
                            Отменить билет?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>Отмена</Button>
                            <Button onClick={handleDelete} autoFocus>
                                Да
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            }
        </Paper>
    );
}

export default TicketCard;