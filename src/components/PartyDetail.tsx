import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { useState, useEffect } from "react";
import { Service } from "../Models/Service";

export default function PartyDetail() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    axios
      .get("https://65e1a8d6a8583365b316f7df.mockapi.io/api/service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Dialog open={true} fullWidth scroll="paper" color="white">
      <Box className="bg-black max-w-3xl rounded-xl overflow-hidden">
        <Box
          sx={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1612189459328-13f9d03623b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
          height={400}
        >
          <Box
            className="relative h-full w-full top-0 left-0"
            sx={{
              backgroundImage: "linear-gradient(0deg,#181818,transparent 50%)",
            }}
          >
            <Box className="flex flex-col gap-4 w-[70%] relative top-[60%] left-[2%]">
              <Box className="flex items-center gap-4">
                <Typography variant="h4">Title</Typography>
                <Chip
                  label="Top rated"
                  size="small"
                  color="primary"
                  icon={<VerifiedIcon />}
                ></Chip>
              </Box>
              <Box className="flex items-center gap-2">
                <Typography component="legend">5.0</Typography>
                <Rating defaultValue={5} readOnly max={5} />
              </Box>
              <Box className="mt-2">
                <Link
                  to="/"
                  className="text-sm font-bold text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg px-5 py-2.5 me-2 mb-2"
                >
                  Book now <ArrowForward></ArrowForward>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <DialogContent>
          <Box className="flex flex-col gap-4 py-4 px-4">
            <Box className="flex flex-col gap-4 items-start justify-between w-full">
              <Box className="flex items-end gap-2">
                <Avatar></Avatar>
                <Typography variant="h5">Someone</Typography>
              </Box>
              <Box className="w-[80%]">
                <Typography variant="subtitle1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati itaque quae exercitationem tempore dolor recusandae
                  ad fugiat eligendi cum voluptatibus, quo provident inventore
                  animi aliquam perspiciatis, sit, dicta velit suscipit!
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h4">Place</Typography>
              <Box>
                {services.map((service) => (
                  <Card
                    sx={{
                      display: "flex",
                      background: "black",
                      color: "white",
                    }}
                  >
                    <Grid sx={{ display: "flex", flexDirection: "row" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {service.name}
                        </Typography>

                        <Typography component="div" variant="subtitle1">
                          {service.price}
                        </Typography>

                        <Typography variant="subtitle1" component="div">
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
