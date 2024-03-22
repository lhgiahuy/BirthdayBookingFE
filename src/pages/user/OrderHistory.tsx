import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Siderbar from "../../components/SiderBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setId } from "../../redux/slice/orderSlice";

// Define enum for status types
enum Status {
  Pending = 1,
  Processing = 0,
  Completed = 3,
  Cancelled = 5,
}

export default function OrderHistory() {
  interface Order {
    description: string;
    id: string;
    hostName: string;
    status: Status; // Use enum for status type
    totalPrice: number;
  }
  const [services, setServices] = useState<Order[]>([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  useAppSelector((state) => state.orderSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get(
        `https://swdbirthdaypartybooking.somee.com/api/getorderbycustomerid?customerId=${id}`
      )
      .then((response) => {
        const mappedServices = response.data.data.map((value: any) => ({
          status: value.status, // Status is already an integer
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
  }, [id]); // Include id in dependency array

  // Function to get status label from enum
  const getStatusLabel = (status: Status): string => {
    switch (status) {
      case Status.Pending:
        return "Pending";
      case Status.Processing:
        return "Processing";
      case Status.Completed:
        return "Completed";
      case Status.Cancelled:
        return "Cancelled";
      default:
        return "";
    }
  };

  // Function to get chip color based on status
  const getChipColor = (
    status: Status
  ):
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "success"
    | "info"
    | "warning" => {
    switch (status) {
      case Status.Pending:
        return "warning";
      case Status.Processing:
        return "info";
      case Status.Completed:
        return "success";
      case Status.Cancelled:
        return "error";
      default:
        return "default";
    }
  };

  // Function to sort services array by status
  const sortServicesByStatus = (services: Order[]): Order[] => {
    return services.slice().sort((a, b) => a.status - b.status);
  };

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
        {sortServicesByStatus(services).map((service) => (
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
                  <Chip
                    label={getStatusLabel(service.status)}
                    color={getChipColor(service.status)} // Dynamically set chip color
                  />
                </Box>
                <Typography fontWeight="bold" variant="h5">
                  ${service.totalPrice}
                </Typography>
              </Box>
              <Typography variant="subtitle1" component="div">
                {service.description}
              </Typography>
              {service.status !== Status.Cancelled && (
                <Box className="flex w-full justify-start">
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(setId(service.id));
                      navigate("/OrderDetails");
                      window.scrollTo(0, 0);
                    }}
                  >
                    View detail
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
