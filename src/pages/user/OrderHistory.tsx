import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Siderbar from "../../components/SiderBar";
export default function OrderHistory() {
  interface Order {
    description: string;
    id: string;
    hostName: string;
    status: string;
    totalPrice: number;
  }
  const [services, setServices] = useState<Order[]>([]);
  const id = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get(
        `https://swdbirthdaypartybooking.somee.com/api/getorderbycustomerid?customerId=${id}`
      )
      .then((response) => {
        const mappedServices = response.data.data.map((value: any) => ({
          status: value.status,
          totalPrice: value.totalPrice,
          hostName: value.hostName,
          id: value.id,
          description: value.note,
        }));
        setServices(mappedServices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  return (
    <Box className="flex gap-16">
      <Siderbar />
      <Box className="flex flex-col p-4 gap-8 w-[70%]">
        <Box className="flex gap-8">
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Order History
            </Typography>
          </Box>
        </Box>
        {services.map((service) => (
          <Box
            key={service.id}
            sx={{
              display: "flex",
              background: "black",
              color: "white",
            }}
            className="gap-8"
          >
            <CardMedia
              className="rounded-3xl"
              component="img"
              sx={{ maxWidth: 256 }}
              image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
            />
            <Box className="flex flex-col w-full gap-4">
              <Box className="flex justify-between items-center">
                <Box className="flex gap-4 items-center">
                  <Typography variant="h5">{service.hostName}</Typography>
                  <Chip label={`${service.status}`} color="primary" />
                </Box>
                <Typography fontWeight="bold" variant="h5">
                  ${service.totalPrice}
                </Typography>
              </Box>
              <Typography variant="subtitle1" component="div">
                {service.description}
              </Typography>
              <Box className="flex w-full justify-start">
                <Button variant="contained">View detail</Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
