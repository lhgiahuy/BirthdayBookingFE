import { Avatar, Box, Breadcrumbs, Button, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Siderbar from "../../components/SiderBar";


interface Service {
    name: string;
    description: string;
    price: string;
    service_type_id: number;
    host_id: number;
    delete_flag: boolean;
    id: string;
}

// https://65e11e3ad3db23f7624a6e99.mockapi.io/ORDER_DETAIL

export default function OrderDetails() {
    const theme = useTheme();
    const linkpage = ["Events", "Order", "Order Details"]
    const sort = ["Place", "Price"];
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
            <Grid container>
                <Grid item xs={4} md={4}>
                    <Siderbar />
                </Grid>
                <Grid item xs={6} md={8}>
                    <Box className="h-auto w-auto   ">
                        <Box className="m-2">
                            <Box>
                                <Breadcrumbs aria-label="breadcrumb" color="white">
                                    {linkpage.map((linkpages) =>
                                        <Link
                                            underline="hover"
                                            sx={{ color: 'white' }}
                                            href="/"
                                        >
                                            {linkpages}
                                        </Link>
                                    )}
                                </Breadcrumbs>
                            </Box>
                            <Box className="pt-6 pb-3 flex space-x-3">
                                <Grid>
                                    <Typography variant="subtitle1">
                                        Order ID: #1234567
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Chip label="pending" color="primary" />
                                </Grid>
                            </Box>

                            <Box className="m-4 ">
                                <Card sx={{ display: 'flex', background: 'black', color: 'white', pt: 3, pb: 3 }}>
                                    <Grid>
                                        <CardMedia
                                            className="rounded-3xl"
                                            component="img"
                                            sx={{ maxWidth: 180, height: 150 }}
                                            image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"

                                        />
                                    </Grid>
                                    <Grid container sx={{ display: 'flex', flexDirection: 'row' }} >
                                        <CardContent sx={{ flex: '1 0 auto', }}>
                                            <Grid className="flex justify-between ">
                                                <Grid item xs={4}>
                                                    <Typography component="div" variant="h5">
                                                        Order Details lor
                                                    </Typography>
                                                </Grid>
                                                <Typography component="div" variant="h5">
                                                    <Button variant="contained" >Cancel</Button>
                                                </Typography>
                                            </Grid>
                                            <Typography variant="subtitle1" component="div" >
                                                Mon, 01 Jan, 2024
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                </Card>
                            </Box>

                            <Box className="m-4 space-y-3">
                                <Typography component="div" variant="h3" >
                                    Place
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Somewhere
                                </Typography>
                                <Typography variant="subtitle1" component="div" >
                                    address
                                </Typography>
                            </Box>

                            <Divider sx={{ mx: 2, border: '1px solid #FFFF' }} />

                            <Box className="m-4 ">
                                <Typography component="div" variant="h3">
                                    Dish
                                </Typography>
                                {services.map((service) =>
                                    <Card sx={{ display: 'flex', background: 'black', color: 'white', mt: 4 }}>
                                        <Grid>
                                            <CardMedia
                                                className="rounded-3xl"
                                                component="img"
                                                sx={{ maxWidth: 380, height: 180 }}
                                                image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"

                                            />
                                        </Grid>
                                        <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Grid className="flex justify-between ">
                                                    <Grid container>
                                                        <Grid item xs={4}>
                                                            <Typography component="div" variant="h5">
                                                                {service.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>

                                                        </Grid>
                                                    </Grid>
                                                    <Typography component="div" variant="h5">
                                                        {service.price}
                                                    </Typography>
                                                </Grid>
                                                <Typography variant="subtitle1" component="div">
                                                    {service.description}
                                                </Typography>
                                            </CardContent>

                                        </Grid>

                                    </Card>
                                )}
                            </Box>

                            <Divider sx={{ mx: 2, border: '1px solid #FFFF' }} />

                            <Box className="m-4 ">
                                <Typography component="div" variant="h3">
                                    Decoration
                                </Typography>
                                {services.map((service) =>
                                    <Card sx={{ display: 'flex', background: 'black', color: 'white', mt: 4 }}>
                                        <Grid>
                                            <CardMedia
                                                className="rounded-3xl"
                                                component="img"
                                                sx={{ maxWidth: 380, height: 180 }}
                                                image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"

                                            />
                                        </Grid>
                                        <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Grid className="flex justify-between ">
                                                    <Grid container>
                                                        <Grid item xs={4}>
                                                            <Typography component="div" variant="h5">
                                                                {service.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>

                                                        </Grid>
                                                    </Grid>
                                                    <Typography component="div" variant="h5">
                                                        {service.price}
                                                    </Typography>
                                                </Grid>
                                                <Typography variant="subtitle1" component="div">
                                                    {service.description}
                                                </Typography>
                                            </CardContent>

                                        </Grid>

                                    </Card>
                                )}
                            </Box>

                            <Divider sx={{ mx: 2, border: '1px solid #FFFF' }} />

                            <Box className="m-4 ">
                                <Box className=" flex flex-col justify-center  ">
                                    <Typography component="div" variant="h3">
                                        Order Details
                                    </Typography>
                                    <Box className="flex justify-between mt-6">
                                        <Typography variant="body2">
                                            Customer name:
                                        </Typography>
                                        <Typography variant="body2">
                                            Le Nguyen Thien An
                                        </Typography>
                                    </Box>
                                    <Box className="flex justify-between mt-3">
                                        <Typography variant="body2">
                                            Phone number:
                                        </Typography>
                                        <Typography variant="body2">
                                            +84 123 123 999
                                        </Typography>
                                    </Box>
                                    <Box className="flex justify-between mt-3">
                                        <Typography variant="body2">
                                            Mail:
                                        </Typography>
                                        <Typography variant="body2">
                                            thienan@gmai.com
                                        </Typography>
                                    </Box>
                                    <Box className="flex justify-between mt-3">
                                        <Typography variant="body2">
                                            Payment method:
                                        </Typography>
                                        <Typography variant="body2">
                                            Momo
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ my: 4, border: '1px solid #FFFF' }} />
                                    <Box className="flex justify-between mt-3">
                                        <Typography variant="body2">
                                            Total:
                                        </Typography>
                                        <Typography variant="body2">
                                            200.000 VND
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>


                        </Box>
                    </Box>
                </Grid >
            </Grid ></>
    )
}