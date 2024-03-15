import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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
  id,
  name,
  description,
  image,
  rating,
  price,
}) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card
      sx={{
        maxWidth: 320,
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "white",
        m: 2,
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="180" image={image} alt={name} />
        <CardContent>
          <Box className="flex w-full justify-between items-center pb-2">
            <Typography variant="h6">
              By <span className="font-bold text-2xl">{name}</span>
            </Typography>
            <Chip label={`${name}`} color="primary"></Chip>
          </Box>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <StarIcon sx={{ color: "gold" }} />
            <Typography variant="h6" sx={{ ml: "10px", color: "white" }}>
              {rating}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mt: "5px", color: "white" }}
          >
            {price} VND
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

export default ServiceCard;
