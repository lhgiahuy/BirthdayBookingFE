import { Avatar, Box, Button, Chip, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Siderbar from "../../components/SiderBar";
import dayjs from "dayjs";
import { Service } from "../../Models/Service";
import { useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";

// https://65e11e3ad3db23f7624a6e99.mockapi.io/ORDER_DETAIL

export default function OrderDetails() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { order } = useAppSelector((state) => state.orderSlice);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://swdbirthdaypartybooking.somee.com/api/getorderdetail?orderId=${order.id}`
        );
        const mappedServices = response.data.data.map((value: any) => ({
          id: value.id,
          name: value.serviceName,
          type: value.serviceType,
          price: value.price,
          quantity: value.number,
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

  const cancelOrder = async () => {
    try {
      await axios.put(
        `https://swdbirthdaypartybooking.somee.com/api/updateorder/${order.id}?status=5`,
        {},
        {
          headers: {
            accept: "*/*",
          },
        }
      );
      // Optionally update local state or perform any other actions
      navigate("/OrderHistory");
      console.log("Order cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <Box className="flex w-full justify-between">
      <Siderbar />
      <Box className="flex flex-col gap-8 w-[70%]">
        <Box
          sx={{
            display: "flex",
            background: "black",
            color: "white",
          }}
          className="w-full gap-8"
        >
          <CardMedia
            className="rounded-3xl"
            component="img"
            sx={{ maxWidth: 180, height: 150 }}
            image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
          />
          <Box className="flex flex-col w-full gap-4 justify-start">
            <Box className="flex w-full justify-between">
              <Box className="flex items-center gap-4">
                <Typography component="div" variant="h4">
                  Order Details
                </Typography>
                <Chip size="small" label="pending" color="primary" />
              </Box>
              <Typography component="div" variant="h5">
                <Button variant="contained" onClick={cancelOrder}>
                  Cancel
                </Button>
              </Typography>
            </Box>
            <Typography variant="caption" component="div">
              {dayjs().toDate().toISOString()}
            </Typography>
            <Box className="flex gap-4 items-center">
              <Avatar
                alt="avatar"
                src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/269922981_3016543585235258_3132946373432292991_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHyXr4F3Z-7d9fd9FodVyaH3eIc7-Lebuvd4hzv4t5u69TRSbqyc-nQJ4FCTPnEYsdvHCrH_NfhmndMvvTwTLm5&_nc_ohc=hibNpN-JsJgAX_ZRGqG&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAUMDS01ew0CeKkFvsV9LTw3w3q1mEaBP0lyw7h0aHHog&oe=660146D6"
              ></Avatar>
              <Typography variant="h6">email</Typography>
            </Box>
          </Box>
        </Box>

        <Divider className="bg-gray-600"></Divider>
        <Box className="flex flex-col gap-16">
          <Box className="flex flex-col gap-8">
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
                    sx={{ maxWidth: 300 }}
                    image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                  />
                  <Box className="flex flex-col w-full gap-4">
                    <Typography variant="h4">{service.name}</Typography>
                    <Typography variant="h5">{service.type}</Typography>
                    <Typography variant="h5">
                      Quantity: {service.quantity}
                    </Typography>
                    <Box className="flex w-full justify-between">
                      <Typography fontWeight="bold" variant="h6">
                        Price: ${service.quantity * service.price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
