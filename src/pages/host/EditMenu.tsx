import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  TextField,
  InputAdornment,
  InputBase,
  IconButton,
  Paper,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Service } from "../../Models/Service";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const linkpage = ["Profile", "Service"];

export default function EditMenu() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  interface Menu {
    id: string;
    name: string;
    description: string;
    price: number;
  }
  // const [services, setServices] = useState<Service[]>([]);
  const [menu, setMenu] = useState<Menu[]>([]);

  const getMenu = async () => {
    try {
      const response = await axios.get(
        "https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=56594440-2c26-4f1c-8ed1-a2ba037cde4e&ServiceType=dish"
      );
      console.log("API Response:", response.data);
      if (response.data && response.data.success) {
        setMenu(response.data.data); // Assuming menu data is within response.data.data
      } else {
        console.log("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMenu();
    console.log("menu ne: ", menu);
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Breadcrumbs
          aria-label="breadcrumb"
          color="white"
          sx={{ mt: 2, ml: 1.25 }}
        >
          {linkpage.map((linkpages) => (
            <Link className="hover:no-underline" href="/">
              <Typography className="text-white"> {linkpages}</Typography>
            </Link>
          ))}
          ;
        </Breadcrumbs>

        <Typography
          variant="h1"
          gutterBottom
          sx={{ mt: 2, ml: 1.25, color: "white" }}
        >
          Event
        </Typography>
      </Grid>
      <Typography gutterBottom sx={{ ml: 1.25, color: "white" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        eos nostrum repudiandae facere molestias, eum recusandae commodi
        provident sit, enim officia, officiis sed. Ab, deserunt! Deserunt
        doloribus perferendis delectus sed?
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          className="flex justify-between items-center py-4"
          justifyContent="space-between"
        >
          <Grid item xs={10}>
            <Typography variant="h3" sx={{ ml: 1.25 }}>
              Menu
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Link href="/">
              <Button variant="contained" size="large">
                <Typography variant="body2" className="px-2">
                  ADD
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          className="flex justify-between py-4"
          justifyContent="space-between"
        >
          <Grid item xs={10}>
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: "white",
                },
                "& label": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },

                "& .MuiInputBase-input": {
                  color: "white", // Thiết lập màu chữ cho input ở đây nếu cần
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              className="w-1/2"
              label="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="contained-select-currency"
              select
              label="Sort"
              helperText="Please select your currency"
              sx={{
                "& label.Mui-focused": {
                  color: "white",
                },
                "& label": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },

                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              <MenuItem>Name</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {Array.isArray(menu) &&
            menu.map((item) => (
              <Card
                sx={{
                  display: "flex",
                  background: "black",
                  color: "white",
                  mt: 4,
                  mb: 4,
                }}
                key={item.id}
              >
                <Grid>
                  <CardMedia
                    className="rounded-3xl"
                    component="img"
                    sx={{ maxWidth: 380, height: 180 }}
                    image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                  />
                </Grid>
                <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Grid
                      className="flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <Grid className="flex ">
                        <Typography component="div" variant="h5">
                          {item.name}
                        </Typography>

                        <Box className="flex ml-2">
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            color="primary"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            color="error"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </Grid>

                      <Typography component="div" variant="h5">
                        {item.price} VND
                      </Typography>
                    </Grid>

                    <Typography variant="subtitle1" component="div">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
