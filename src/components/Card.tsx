import React from 'react';
import {
    Card, CardActionArea, CardContent, CardMedia, Typography, Box, Grid
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

// Define the prop types
interface ServiceCardProps {
    id: string;
    name: string;
    description: string;
    image?: string;
    rating?: string;
    price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    id, name, description, image, rating, price
}) => (
    <Grid item xs={12} sm={6} md={3}>
        <Card sx={{
            maxWidth: 320, backgroundColor: 'transparent',
            boxShadow: 'none', color: 'white', m: 2
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                        <StarIcon sx={{ color: 'gold' }} />
                        <Typography variant="body2" sx={{ ml: '10px', color: 'white' }}>
                            {rating}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: '5px', color: 'white' }}>
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
);

export default ServiceCard;