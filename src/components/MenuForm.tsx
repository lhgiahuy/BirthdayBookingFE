import { useEffect, useState } from "react";
import { Box, Button, CardMedia, IconButton, Typography } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  addDish,
  removeService,
  addDecoration,
} from "../redux/slice/orderSlice";
import { Service } from "../Models/Service";

interface ServiceFormProps {
  title: string;
  type: string;
}

export default function ServiceForm(props: ServiceFormProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useAppSelector((state) => state.serviceState);
  const dispatch = useAppDispatch();
  const { selectedServices, decoration } = useAppSelector(
    (state) => state.orderSlice
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=${id}&ServiceType=${props.type}`
        );
        const mappedServices = response.data.data.map((value: any) => ({
          id: value.id,
          name: value.name,
          description: value.name,
          price: value.price,
        }));
        setServices(mappedServices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [props.type]);

  const getQuantityByServiceId = (serviceId: string) => {
    const service = selectedServices.find(
      (service) => service.serviceId === serviceId
    );
    return service ? service.quantity : 0;
  };

  const isDecorationAdded = (serviceId: string) => {
    return decoration.id === serviceId;
  };

  return (
    <Box className="flex flex-col gap-16 mt-16">
      <Typography variant="h4">{props.title}</Typography>
      <Box className="flex flex-col w-full gap-8">
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          services.map((service) => (
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
              <Box className="flex flex-col w-full gap-2">
                <Typography variant="h4">{service.name}</Typography>
                <Typography variant="subtitle1" component="div">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
                  nihil quidem quisquam iure placeat harum iusto, ipsa culpa
                  repudiandae perferendis rem rerum magnam, dolor qui
                  consectetur, eos provident autem natus!
                </Typography>
                <Box className="flex w-full justify-between">
                  <Typography fontWeight="bold" variant="h5">
                    {service.price}.000VNĐ
                  </Typography>
                  <Box className="flex w-full justify-end">
                    {props.type === "dish" ? (
                      <Box className="flex w-full gap-4 items-center justify-end">
                        <IconButton
                          size="small"
                          sx={{ color: "white", border: "1px solid white" }}
                          onClick={() => {
                            dispatch(removeService(service.id));
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>
                          {getQuantityByServiceId(service.id)}
                        </Typography>
                        <IconButton
                          size="small"
                          sx={{ color: "white", border: "1px solid white" }}
                          onClick={() => {
                            dispatch(
                              addDish({
                                serviceId: service.id,
                                quantity: 1,
                                price: service.price,
                              })
                            );
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box>
                        <Button
                          variant="contained"
                          disabled={
                            isDecorationAdded(service.id) ? true : false
                          }
                          onClick={() => {
                            dispatch(
                              addDecoration({
                                decorationId: service.id,
                                price: service.price,
                              })
                            );
                          }}
                        >
                          {isDecorationAdded(service.id) ? "Added" : "Add"}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
