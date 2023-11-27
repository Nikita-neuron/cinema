import React from 'react';

import { 
    Box,
    Card,
    CardContent,
    Typography,
    Link,
    Button,
    CardMedia,
    List,
    ListItem,
    CardActions
} from "@mui/material";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    item: {
      ':not(:first-child)&::before': {
        margin: 6,
        content: '"•"',
      }
    },
    tableCell: {
        "border-bottom": "none"
    }
});

const MovieCard = ({ movie }) => {
    const classes = useStyles();

    return (
        <Card sx={{ padding: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 80}}
                    image="https://lipsum.app/80x120"
                    title={ movie.title }
                />
                <CardContent
                    sx={{
                        padding: 0,
                        marginTop: 1
                    }}
                >
                    <Typography variant="h6" align="center">
                        { movie.title }
                    </Typography>
                    <List
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        { movie.genres.map(genre => {
                            return (
                                <ListItem 
                                    key={ genre.id } 
                                    sx={{ padding: 0, width: "auto" }} 
                                    className={classes.item}
                                >
                                    <Typography>
                                        { genre.name }
                                    </Typography>
                                </ListItem>
                            )
                        }) }
                    </List>
                </CardContent>
                <CardActions
                    sx={{
                        padding: 0
                    }}
                >
                    <Button href={ `/movie/${ movie.id }` }>О фильме</Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default MovieCard;