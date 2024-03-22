import {
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import EditIcon from "@mui/icons-material/Edit";
import { Service } from "../../Models/Service";
import Siderbar from "../../components/SiderBar";
export default function OrderManagement() {
  const linkpage = ["Profile", "Order Manager"];
  const sort = ["Place", "Price"];
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
    <>
      <Grid container>
        <Grid item xs={4} md={4}>
          <Siderbar />
        </Grid>

        <Grid item xs={6} md={8}>
          <Box className="h-auto w-auto ">
            <Box className="m-2">
              <Box>
                <Breadcrumbs aria-label="breadcrumb" color="white">
                  {linkpage.map((linkpages) => (
                    <Link underline="hover" sx={{ color: "white" }} href="/">
                      {linkpages}
                    </Link>
                  ))}
                </Breadcrumbs>
              </Box>
              <Box className="py-3">
                <Typography variant="h3">Order Management</Typography>
              </Box>
              <Box>
                {sort.map((sorts) => (
                  <FormControl
                    key={sorts}
                    sx={{
                      my: 1,
                      minWidth: 400,
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  >
                    <InputLabel
                      sx={{ color: "white" }}
                      id={`select-${sorts}-label`}
                    >
                      {sorts}
                    </InputLabel>
                    <Select
                      labelId={`select-${sorts}-label`}
                      id={`select-${sorts}`}
                      label={sorts}
                      sx={{
                        color: "white",
                        "& .MuiSelect-icon": { color: "white" },
                        "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                      {/* ... */}
                    </Select>
                  </FormControl>
                ))}
              </Box>
            </Box>
            <Box className="my-4 ">
              {services.map((service) => (
                <Card
                  sx={{
                    display: "flex",
                    background: "black",
                    color: "white",
                    my: 4,
                  }}
                >
                  <Grid>
                    <CardMedia
                      className="rounded-3xl"
                      component="img"
                      sx={{ maxWidth: 450, height: 180 }}
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
                              {service.name}
                            </Typography>
                          </Grid>
                          <Grid>
                            <Chip label="pending" color="primary" />
                          </Grid>
                        </Grid>
                        <Typography component="div" variant="h5">
                          {service.price}
                        </Typography>
                      </Grid>
                      <Typography variant="subtitle1" component="div">
                        {service.description}
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
