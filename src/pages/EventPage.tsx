import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import {
    Box, Grid, Typography, Breadcrumbs, Link, FormControl, InputLabel,
    Select, MenuItem, Card, CardContent, CardMedia, CardActionArea
} from '@mui/material';

interface Service {
    name: string;
    description: string;
    price: string;
    service_type_id: number;
    host_id: number;
    delete_flag: boolean;
    id: string;
}

export default function EventPage() {
    const [services, setServices] = useState<Service[]>([]);
    const pages = ["Company", "Event", "Rating", "Price"];

    useEffect(() => {
        axios.get('https://65e1a8d6a8583365b316f7df.mockapi.io/api/service')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} sm={8}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, ml: 1.25 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ color: 'white' }}
                        href="/">
                        Events
                    </Link>
                </Breadcrumbs>

                <Typography variant="h4" gutterBottom sx={{ mt: 2, ml: 1.25, color: 'white' }}>
                    Event
                </Typography>
                <Typography gutterBottom sx={{ mt: 1, ml: 1.25, color: 'white' }}>
                    Many choices for you
                </Typography>

                {pages.map((page) => (
                    <FormControl key={page} sx={{ m: 1, minWidth: 200, color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}>
                        <InputLabel sx={{ color: 'white' }} id={`select-${page}-label`}>
                            {page}
                        </InputLabel>
                        <Select
                            labelId={`select-${page}-label`}
                            id={`select-${page}`}
                            label={page}
                            sx={{
                                color: 'white',
                                '& .MuiSelect-icon': { color: 'white' },
                                '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            {/* ... */}
                        </Select>
                    </FormControl>
                ))}
            </Grid>

            <Grid item xs={12} sx={{ flexGrow: 1, mt: 3 }}>
                <Box>
                    <Grid container spacing={2}>
                        {services.map((service) => (
                            <Grid key={service.id} item xs={12} sm={6} md={3}>
                                <Card sx={{
                                    maxWidth: 320, backgroundColor: 'transparent',
                                    boxShadow: 'none', color: 'white', m: 2
                                }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{service.name}</Typography>
                                            <Typography variant="body2">
                                                {service.description}
                                            </Typography>
                                            <Box display="flex" alignItems="center" mt={2}>
                                                <StarIcon sx={{ color: 'gold' }} />
                                                <Typography variant="body2" sx={{ ml: '10px', color: 'white' }}>
                                                    5.0
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ mt: '5px', color: 'white' }}>
                                                {service.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}