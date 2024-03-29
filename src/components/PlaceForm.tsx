import { useEffect, useState } from "react";
import { Box, FormControl, Radio, RadioGroup, Typography } from "@mui/material";
import { Place } from "../Models/Place";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setPlace } from "../redux/slice/orderSlice";

export default function PlaceForm() {
  const [services, setServices] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useAppSelector((state) => state.serviceState);
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.orderSlice);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://swdbirthdaypartybooking.somee.com/api/getplace?Id=${id}`
        );
        const mappedServices = response.data.data.map((value: any) => ({
          id: value.id,
          name: value.name,
          description: value.description,
          price: value.price,
          address: value.address,
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

  const handleRadioChange = (serviceId: string, price: number) => {
    dispatch(setPlace({ placeId: serviceId, price: price }));
  };

  return (
    <FormControl fullWidth>
      <Box className="flex flex-col w-[70%] gap-16 mt-16">
        <Typography variant="h4">CHOOSE YOUR PLACE</Typography>
        <RadioGroup
          value={order.place.id}
          onChange={(e) =>
            handleRadioChange(
              e.target.value,
              services.find((service) => service.id === e.target.value)
                ?.price || 0
            )
          }
        >
          <Box className="flex w-full flex-col gap-8 ">
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              services.map((service) => (
                <Box
                  key={service.id}
                  className="cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 border-gray-700 hover:border-white"
                >
                  <Radio value={service.id} />
                  <Box className="flex flex-col items-start gap-2">
                    <Typography component="div" variant="h5">
                      {service.name}
                    </Typography>

                    <Typography
                      color="gray"
                      variant="subtitle1"
                      component="div"
                    >
                      {service.address}
                    </Typography>

                    <Typography
                      component="div"
                      fontWeight="bold"
                      variant="subtitle1"
                    >
                      ${service.price}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </RadioGroup>
      </Box>
    </FormControl>
  );
}
