
import {
    Box, Grid, Typography, Breadcrumbs, Link
    , Button, Card, CardContent, TextField, InputAdornment, IconButton, MenuItem
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Service } from '../../Models/Service';
import 'react-multi-carousel/lib/styles.css';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const linkpage = ["Profile", "Service",]

export default function EditPlace() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    interface Place {
        id: string;
        name: string;
        description: string;
        address: string;
        price: number;
    }

    const [places, setPlaces] = useState<Place[]>([]);

    const getPlaces = async () => {
        try {
            const response = await axios.get(
                'https://swdbirthdaypartybooking.somee.com/api/getplace?id=114e9f53-7fc3-4e3a-944f-2d5e66c65410');
            console.log('API Response:', response.data); // Log the response to understand its structure
            // Modify the logic to extract places correctly
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.$values)) {
                setPlaces(response.data.data.$values);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }

    }

    useEffect(() => {
        getPlaces()
        console.log("data ne: ", places);
    }, []);
    return (
        <Grid container>
            <Grid item xs={12} sm={8}>
                <Breadcrumbs aria-label="breadcrumb" color="white" sx={{ mt: 2, ml: 1.25 }}>
                    {linkpage.map((linkpages) =>
                        <Link className='hover:no-underline'

                            href="/"
                        >
                            <Typography className='text-white'>   {linkpages}</Typography>
                        </Link>
                    )}
                </Breadcrumbs>

                <Typography variant="h4" gutterBottom sx={{ mt: 2, ml: 1.25, color: 'white' }}>
                    Event
                </Typography>
            </Grid>
            <Typography gutterBottom sx={{ mt: 1, ml: 1.25, color: 'white' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eos nostrum repudiandae facere molestias, eum recusandae commodi provident sit, enim officia, officiis sed. Ab, deserunt! Deserunt doloribus perferendis delectus sed?
            </Typography>
            <Grid container>
                <Grid item xs={12} className='flex justify-between items-center'>
                    <Typography variant='h4' sx={{ ml: 1.25 }}>Place</Typography>
                    <Link href="/">
                        <Button variant='contained' size='small'>
                            <Typography variant="body2" className='px-3' >
                                ADD
                            </Typography>
                        </Button>
                    </Link>

                </Grid>
                <Grid container justifyContent="space-around">
                    <Grid item xs={10} className='pl-2'>
                        <TextField
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'white',
                                },
                                '& label': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },

                                '& .MuiInputBase-input': {
                                    color: 'white', // Thiết lập màu chữ cho input ở đây nếu cần
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                }
                            }}
                            className='w-1/2' label="Search"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="contained-select-currency"
                            select
                            label="Sort"


                            helperText="Please select your currency"
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'white',
                                },
                                '& label': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },

                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                }
                            }}
                        >

                            <MenuItem>
                                Name
                            </MenuItem>

                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {places && places.map(place =>
                        <Card sx={{ display: 'flex', background: 'black', color: 'white' }} >

                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Box>
                                        <Box className="flex items-center">
                                            <Typography component="div" variant="h4">
                                                {place.name}
                                            </Typography>
                                            <Box>

                                                <IconButton aria-label="delete" size="medium" color="primary">
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="medium" color="error">
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Typography component="div" variant="subtitle1">
                                        {place.address}
                                    </Typography>


                                    <Typography variant="subtitle1" component="div">
                                        {place.description}
                                    </Typography>
                                </CardContent>

                            </Grid>

                        </Card>
                    )}
                </Grid>
            </Grid>


        </Grid>
    );
}