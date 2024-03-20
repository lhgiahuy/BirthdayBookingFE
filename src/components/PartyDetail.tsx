import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Dialog,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { useState, useEffect } from "react";
import { Service } from "../Models/Service";
import Carousel from "react-multi-carousel";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setIsOpen } from "../redux/slice/serviceSlice";

export default function PartyDetail() {
  const [services, setServices] = useState<Service[]>([]);
  const dispatch = useAppDispatch();
  const { modalOpen } = useAppSelector((state) => state.serviceState);
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

  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <Dialog open={modalOpen} maxWidth="md" scroll="body">
      <Box sx={{ color: "white!important" }} className="bg-black">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 100,
          }}
        >
          <CloseIcon />
        </IconButton>
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
        <Box className="flex flex-col gap-4 py-4 px-8">
          <Box className="flex flex-col gap-4 items-start justify-between w-full">
            <Box className="flex items-end gap-2">
              <Avatar></Avatar>
              <Typography variant="h5">Someone</Typography>
            </Box>
            <Box className="w-[80%]">
              <Typography variant="subtitle1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati itaque quae exercitationem tempore dolor recusandae ad
                fugiat eligendi cum voluptatibus, quo provident inventore animi
                aliquam perspiciatis, sit, dicta velit suscipit!
              </Typography>
            </Box>
          </Box>
          <Divider className="bg-gray-400" variant="fullWidth"></Divider>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Place
            </Typography>
            <Box>
              {services.map((service) => (
                <Box className="flex flex-col mt-4">
                  <Box className="flex flex-col gap-2">
                    <Typography component="div" variant="h5">
                      {service.name}
                    </Typography>

                    <Typography component="div" variant="subtitle1">
                      {service.price}
                    </Typography>

                    <Typography variant="subtitle1" component="div">
                      {service.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Divider className="bg-gray-400" variant="fullWidth"></Divider>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Menu
            </Typography>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className="mt-4"
              dotListClass=""
              focusOnSelect={false}
              itemClass=""
              keyBoardControl
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 4,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={4}
            >
              {/* Dynamic content */}
              {services.map((service) => (
                <div key={service.id}>
                  <Card
                    sx={{
                      maxWidth: 200,
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
                      <Box className="flex flex-col gap-1">
                        <Typography variant="h6">{service.name}</Typography>
                        <Typography variant="body2">
                          {service.description}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Box className="flex items-center gap-2">
                            <Rating defaultValue={1} max={1} />
                            <Typography component="legend">5.0</Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ mt: "5px", color: "white" }}
                        >
                          {service.price}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Box>
          <Divider className="bg-gray-400" variant="fullWidth"></Divider>

          <Box>
            <Typography variant="h4" fontWeight="bold">
              Decorations
            </Typography>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className="mt-4"
              dotListClass=""
              focusOnSelect={false}
              itemClass=""
              keyBoardControl
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 4,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={4}
            >
              {/* Dynamic content */}
              {services.map((service) => (
                <div key={service.id}>
                  <Card
                    sx={{
                      maxWidth: 200,
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
                      <Box className="flex flex-col gap-1">
                        <Typography variant="h6">{service.name}</Typography>
                        <Typography variant="body2">
                          {service.description}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Box className="flex items-center gap-2">
                            <Rating defaultValue={1} max={1} />
                            <Typography component="legend">5.0</Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ mt: "5px", color: "white" }}
                        >
                          {service.price}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
