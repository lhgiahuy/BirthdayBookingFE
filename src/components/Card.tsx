import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Card, CardActionArea, CardMedia, Grid } from "@mui/material";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExpandableCard from "./ExpandableCard";

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
  start: number;
  end: number;
}

export default function CardCarousel(props: CarouselProps) {
  const [services, setServices] = useState<Service[]>([]);
  const { start, end } = props;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://65e1a8d6a8583365b316f7df.mockapi.io/api/service"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box className="flex flex-wrap gap-4">
      {services.slice(start, end).map((service) => (
        <div key={service.id}>
          <ExpandableCard
            name={service.name}
            description={service.description}
            rating="5.0"
            tag="Top rated"
          />
        </div>
      ))}
    </Box>
  );
}
