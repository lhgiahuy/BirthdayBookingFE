import { Box, Grid, Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
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
    const pages = ["Company", "Event", "Rating", "Price"];
    const [services, setServices] = useState<Service[]>([]);
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
        <>
            <Grid container >
                <Grid item xs={6} md={8} sx={{ mt: '10px', ml: '10px' }}>
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" sx={{ color: 'white' }} href="/">
                                Events
                            </Link>

                        </Breadcrumbs>

                    </div>
                </Grid>
                <Grid item xs={6} md={8} sx={{ mt: '10px', ml: '10px' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                        Event
                    </Typography>
                </Grid>
                <Grid item xs={6} md={8} sx={{ mt: '10px', ml: '10px' }}>
                    <Typography gutterBottom sx={{ color: 'white' }}>
                        Many choice for you
                    </Typography>
                </Grid>
                <Grid item xs={12} md={0} sx={{ mt: '10px', }}>

                    {pages.map((page) => (
                        <FormControl sx={{ m: 1, minWidth: 200, color: 'white' }} >
                            <InputLabel id="demo-simple-select-helper-label" sx={{ color: 'white' }} >{page}</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label={page}
                                sx={{
                                    '& .MuiSelect-root': {
                                        color: 'white',
                                    },
                                    '& .MuiMenuItem-root': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                    },
                                    '& .MuiSelect-nativeInput': {
                                        color: 'white',
                                    },
                                    '& .MuiSelect-icon': {
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: 'white',
                                    },
                                }}
                            >

                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>

                        </FormControl>
                    ))}


                </Grid>
                <Grid item xs={12} sx={{ mt: '30px', ml: '10px' }}>
                    <Typography color="white">Lorem ipsum dolor.</Typography>
                </Grid>
                <Box sx={{ flexGrow: 1, mt: '30px' }}   >
                    <Grid container spacing={{ xs: 1, md: 4 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                        {services.map(service => (
                            <Grid item xs={2} sm={3} md={3} >
                                <Card sx={{
                                    maxWidth: 320,
                                    backgroundColor: 'black',
                                    color: 'white'
                                }}>
                                    <CardActionArea >
                                        <CardMedia
                                            sx={{ borderRadius: '20px', }}
                                            component="img"
                                            height="180"
                                            image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                                        />
                                        <CardContent>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="h6" color="white">
                                                        {service.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" sx={{ backgroundColor: '#29b6f6', padding: '3px', borderRadius: '12px' }} color="white">
                                                        Something
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Typography variant="body2" color="white">
                                                {service.description}
                                            </Typography>
                                            <Grid container alignItems="center" >
                                                <StarIcon />
                                                <Typography variant="body2" sx={{ ml: '10px' }} color="white">
                                                    5.0
                                                </Typography>
                                            </Grid>
                                            <Typography variant="body2" sx={{ mt: '5px' }} color="white">
                                                {service.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}

                    </Grid >

                </Box >
            </Grid >

        </>
    );
}
