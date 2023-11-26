import React from "react";

import { 
    Box,
    Card,
    CardContent,
    Typography,
    Link,
    Button
} from "@mui/material";

function SeancesMovieCard({ data }) {
    const prices = data.Hall.Seats.map((seat) => seat.price);
    const minPrice  = Math.min(...prices);
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Box
                    component="div"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <Box
                        sx={{ marginRight: 3 }}
                    >
                        <Typography variant="h5" >
                            <Link underline="none" href={ `/cinema/${data.id}` }>
                                { data.Hall.Cinema.name }
                            </Link>
                        </Typography>
                        <Typography >
                            { data.Hall.Cinema.address }
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            От { minPrice } ₽
                        </Typography>
                        <Button
                            variant="contained"
                            href={ `/buyTicket/${data.id}` }
                        >
                            { data.begin }
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default SeancesMovieCard;