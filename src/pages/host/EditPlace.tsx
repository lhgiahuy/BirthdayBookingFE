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

export default function EditPlace() {
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
        </Breadcrumbs>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: 2, ml: 1.25, color: "white" }}
        >
          Event
        </Typography>
      </Grid>
      <Typography gutterBottom sx={{ mt: 1, ml: 1.25, color: "white" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        eos nostrum repudiandae facere molestias, eum recusandae commodi
        provident sit, enim officia, officiis sed. Ab, deserunt! Deserunt
        doloribus perferendis delectus sed?
      </Typography>
      <Grid container>
        <Grid item xs={12} className="flex justify-between items-center">
          <Typography variant="h4" sx={{ ml: 1.25 }}>
            Place
          </Typography>
          <Link href="/">
            <Button variant="contained" size="small">
              <Typography variant="body2" className="px-3">
                ADD
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item xs={10} className="pl-2">
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
          {services.map((service) => (
            <Card sx={{ display: "flex", background: "black", color: "white" }}>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Box>
                    <Box className="flex items-center">
                      <Typography component="div" variant="h4">
                        {service.name}
                      </Typography>
                      <Box>
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
                    </Box>
                  </Box>

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
        </Grid>
      </Grid>
    </Grid>
  );
}
