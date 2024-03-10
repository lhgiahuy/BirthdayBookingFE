
import {
    Box, Grid, Typography, Breadcrumbs, Link
    , Button, Card, CardMedia, CardContent, CardActionArea
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Service } from '../../Models/Service';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface CarouselProps {
    deviceType?: string;
}

const linkpage = ["Profile", "Service",]

export default function HomeHost(props: CarouselProps) {
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
                                Edit
                            </Typography>
                        </Button>
                    </Link>

                </Grid>
                <Grid item xs={12}>
                    {services.map((service) =>
                        <Card sx={{ display: 'flex', background: 'black', color: 'white' }}>

                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {service.name}
                                    </Typography>

                                    <Typography component="div" variant="subtitle1">
                                        {service.price}
                                    </Typography>


                                    <Typography variant="subtitle1" component="div">
                                        {service.description}
                                    </Typography>
                                </CardContent>

                            </Grid>

                        </Card>
                    )}

                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} className='flex justify-between items-center'>
                    <Typography variant='h4' sx={{ ml: 1.25 }}>Dish</Typography>
                    <Link href="/">
                        <Button variant='contained' size='small'>
                            <Typography variant="body2" className='px-3' >
                                Edit
                            </Typography>
                        </Button>
                    </Link>

                </Grid>
                <Grid item xs={12}>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={props.deviceType !== "mobile"}

                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {/* Dynamic content */}
                        {services.map((service) => (
                            <div key={service.id}>
                                <Card sx={{ maxWidth: 320, backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{service.name}</Typography>
                                            <Typography variant="body2">{service.description}</Typography>
                                            <Box display="flex" alignItems="center" mt={2}>

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
                            </div>
                        ))}
                    </Carousel>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} className='flex justify-between items-center'>
                    <Typography variant='h4' sx={{ ml: 1.25 }}>Decorations</Typography>
                    <Link href="/">
                        <Button variant='contained' size='small'>
                            <Typography variant="body2" className='px-3' >
                                Edit
                            </Typography>
                        </Button>
                    </Link>

                </Grid>
                <Grid item xs={12}>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={props.deviceType !== "mobile"}

                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {/* Dynamic content */}
                        {services.map((service) => (
                            <div key={service.id}>
                                <Card sx={{ maxWidth: 320, backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{service.name}</Typography>
                                            <Typography variant="body2">{service.description}</Typography>
                                            <Box display="flex" alignItems="center" mt={2}>

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
                            </div>
                        ))}
                    </Carousel>
                </Grid>
            </Grid>
        </Grid>
    );
}