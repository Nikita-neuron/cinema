import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function CinemaCard({ data }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" >
                    <Link underline="none" href={ `/cinema/${data.id}` }>
                        { data.name }
                    </Link>
                </Typography>
                <Typography >
                    { data.address }
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CinemaCard;