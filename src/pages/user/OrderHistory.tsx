import { Avatar, Box, Breadcrumbs, Chip, Divider, FormControl, Grid, IconButton, InputLabel, Link, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Siderbar from "../../components/SiderBar";
import { Service } from "../../Models/Service";
export default function OrderHistory() {
    const linkpage = ["Profile", "Order History"]
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
                <Grid item xs={8} md={8}>
                    <Box className="h-auto w-auto ">
                        <Box >
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
                            <Box className="p-3">
                                <Typography variant="h4">
                                    Order History
                                </Typography>
                            </Box>
                            <Box>
                                {sort.map((sorts) => (
                                    <FormControl
                                        key={sorts}
                                        sx={{
                                            m: 1,
                                            minWidth: 400,
                                            color: "white",
                                            ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                        }}
                                    >
                                        <InputLabel sx={{ color: "white" }} id={`select-${sorts}-label`}>
                                            {sorts}
                                        </InputLabel>
                                        <Select
                                            labelId={`select-${sorts}-label`}
                                            id={`select-${sorts}`}
                                            label={sorts}
                                            sx={{
                                                color: "white",
                                                "& .MuiSelect-icon": { color: "white" },
                                                "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "white",
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "white",
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "white",
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                            {/* ... */}
                                        </Select>
                                    </FormControl>
                                ))}
                            </Box>
                        </Box>
                        <Box >
                            {services.map((service) =>
                                <Card sx={{ display: 'flex', background: 'black', color: 'white', mt: 4, }}>
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
                                                        <Chip label="pending" color="primary" />
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

                    </Box>
                </Grid >
            </Grid >
        </>
    );
}
