import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Grid
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Ensure you are importing the right CSS file for 'react-multi-carousel'

interface Service {
    name: string;
    description: string;
    price: string;
    service_type_id: number;
    host_id: number;
    delete_flag: boolean;
    id: string;
}

interface CarouselProps {
    deviceType?: string;
}

export default function Slide(props: CarouselProps) {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://65e1a8d6a8583365b316f7df.mockapi.io/api/service');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    return (

        <Grid container>
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
                        </div>
                    ))}
                </Carousel>
            </Grid>
        </Grid>
    );
}
