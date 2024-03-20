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
  const [services, setServices] = useState<Service[]>([]);
  const { start, end } = props;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await agent.Account.getHostAccount();
        setServices(response.data);
        const mappedServices = response.data.map((value: any) => ({
          // Map fields according to the Service interface
          id: value.id, // Replace field1 with the actual field name
          name: value.name,
          description: value.name,
          // Replace field2 with the actual field name
          // Add more fields as needed
        }));
        setServices(mappedServices);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorResponse = error?.response?.data?.error?.message;
          console.log(errorResponse);
          // Handle error, e.g., show error message to user
        }
      }
    };

    fetchData();
  }, []); // Specify dependencies if needed

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
