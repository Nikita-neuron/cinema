import React from "react";

import { 
    Card, 
    CardContent,
    CardActions, 
    CardMedia,
    Typography, 
    Button,
    Box
} from "@mui/material";

function SeanceCard({ data }) {
    const prices = data.Hall.Seats.map((seat) => seat.price);
    const minPrice  = Math.min(...prices);
    return (
        <Card sx={{ minWidth: 275 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 80}}
                    image="https://lipsum.app/80x120"
                    title={ data.Movie.title }
                />
                <CardContent>
                    <Typography variant="h5" align="center">
                        { data.Movie.title }
                    </Typography>
                    <Typography align="center" marginTop={ 2 }>
                        { data.begin }
                    </Typography>
                    <Typography align="center" marginTop={ 2 }>
                        От { minPrice } ₽
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={ `/buyTicket/${ data.id }` }>Купить билет</Button>
                    <Button href={ `/movie/${ data.Movie.id }` }>О фильме</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default SeanceCard;