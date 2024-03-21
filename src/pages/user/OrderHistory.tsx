import {
  Box,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Siderbar from "../../components/SiderBar";
import { Service } from "../../Models/Service";
export default function OrderHistory() {
  interface Order{
    hostId: string;
    status: string;
    totalPrice: number
  }
  const [services, setServices] = useState<Order[]>([]);

  const id = "53b6a602-de1c-4589-ac04-66b165d98c57";
  useEffect(() => {
    axios
      .get(
        `https://swdbirthdaypartybooking.somee.com/api/getorderbycustomerid?customerId=${id}`
      )
      .then((response) => {
        const mappedServices = response.data.data.map((value: any) => ({
          status: value.status,
          totalPrice: value.totalPrice,
          hostId: value.hostId,
        }));
        setServices(mappedServices);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  return (
    <>
      <Grid container>
        <Grid item xs={4} md={4}>
          <Siderbar />
        </Grid>
        <Grid item xs={8} md={8}>
          <Box className="h-auto w-auto ">
            <Box>
              <Box>
              </Box>
              <Box className="p-3">
                <Typography variant="h4" fontWeight="bold">Order History</Typography>
              </Box>
            </Box>
            <Box>
              {services.map((service) => (
                <Card
                  sx={{
                    display: "flex",
                    background: "black",
                    color: "white",
                    mt: 4,
                  }}
                >
                  <Grid>
                    <CardMedia
                      className="rounded-3xl"
                      component="img"
                      sx={{ maxWidth: 380, height: 180 }}
                      image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                    />
                  </Grid>
                  <Grid
                    container
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Grid className="flex justify-between ">
                        <Grid container>
                          <Grid item xs={4}>
                            <Typography component="div" variant="h5">
                            </Typography>
                          </Grid>
                          <Grid>
                            <Chip label="pending" color="primary" />
                          </Grid>
                        </Grid>
                        <Typography component="div" variant="h5">
                          {service.totalPrice}
                        </Typography>
                      </Grid>
                      <Typography variant="subtitle1" component="div">
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
