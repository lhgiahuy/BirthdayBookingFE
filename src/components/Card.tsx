import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Box, Card, CardActionArea, CardMedia, Grid } from "@mui/material";

import "react-multi-carousel/lib/styles.css";
import ExpandableCard from "./ExpandableCard";
import agent from "../utils/agent2";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Service[]>([]);
  const { start, end } = props;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://swdbirthdaypartybooking.somee.com/api/getallhost`
        );
        const mappedServices = response.data.data.map((value: any) => ({
          id: value.id,
          name: value.name,
          description: value.name,
        }));
        setServices(mappedServices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <Box className="flex gap-4">
      {services.slice(start, end).map((service) => (
        <div key={service.id}>
          <ExpandableCard
            id={service.id}
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
