import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import { Service } from "../../Models/Service";
import { useEffect, useState } from "react";
import axios from "axios";
interface CarouselProps {
  deviceType?: string;
}
export default function ServiceDetails(props: CarouselProps) {
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
    <Grid>
      <Grid item xs={12} sm={8}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, ml: 1.25 }}>
          <Link
            underline="hover"
            color="inherit"
            sx={{ color: "white" }}
            href="/"
          >
            BOOKING
          </Link>
        </Breadcrumbs>
        <Grid sx={{ mt: 2, ml: 1.25 }}>
          <Typography variant="h4">Service Details</Typography>
        </Grid>
        <Grid container className="mt-3">
          <Grid item xs={6}>
            <Box className=" flex justify-start" sx={{ ml: 1.25 }}>
              <img
                className="w-5/6 rounded-2xl"
                src="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                alt=""
              />
            </Box>
          </Grid>
          <Grid xs={6} direction="row" container spacing={3}>
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                Birthday Party for kids
              </Typography>
              <Box display="flex" alignItems="center">
                <StarIcon sx={{ color: "gold" }} />
                <Typography variant="body2" sx={{ ml: "10px", color: "white" }}>
                  5.0
                </Typography>
              </Box>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Birthday Party for kids
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Labore blanditiis incidunt deserunt aut placeat quae
                    dignissimos nulla autem! Et illum unde excepturi facere
                    nihil, accusantium provident quas ratione repellat possimus.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className="flex justify-end">
              <Grid>
                <Button variant="contained" size="medium">
                  Continuous
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className="mt-6">
          <Grid item xs={12} className="flex justify-between items-center">
            <Typography variant="h4" sx={{ ml: 1.25 }}>
              Place
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {services.map((service) => (
              <Card
                sx={{ display: "flex", background: "black", color: "white" }}
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
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className="flex justify-between items-center">
            <Typography variant="h4" sx={{ ml: 1.25 }}>
              Dish
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={props.deviceType !== "mobile"}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {/* Dynamic content */}
              {services.map((service) => (
                <div key={service.id}>
                  <Card
                    sx={{
                      maxWidth: 320,
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      color: "white",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                      />
                      <CardContent>
                        <Typography variant="h6">{service.name}</Typography>
                        <Typography variant="body2">
                          {service.description}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                          <Typography
                            variant="body2"
                            sx={{ ml: "10px", color: "white" }}
                          >
                            5.0
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: "5px", color: "white" }}
                        >
                          {service.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className="flex justify-between items-center">
            <Typography variant="h4" sx={{ ml: 1.25 }}>
              Decorations
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={props.deviceType !== "mobile"}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {/* Dynamic content */}
              {services.map((service) => (
                <div key={service.id}>
                  <Card
                    sx={{
                      maxWidth: 320,
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      color: "white",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                      />
                      <CardContent>
                        <Typography variant="h6">{service.name}</Typography>
                        <Typography variant="body2">
                          {service.description}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                          <Typography
                            variant="body2"
                            sx={{ ml: "10px", color: "white" }}
                          >
                            5.0
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: "5px", color: "white" }}
                        >
                          {service.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
