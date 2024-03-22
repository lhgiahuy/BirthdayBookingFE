import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
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
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { useState, useEffect } from "react";
import { Host } from "../Models/Host";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setId, setIsOpen } from "../redux/slice/serviceSlice";
import Carousel from "react-multi-carousel";
import { Service } from "../Models/Service";
import { Place } from "../Models/Place";
import { useNavigate } from "react-router-dom";

export default function PartyDetail() {
  const [service, setService] = useState<Host>();
  const [menu, setMenu] = useState<Service[]>([]);
  const [decoration, setDecoration] = useState<Service[]>([]);
  const [place, setPlace] = useState<Place[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { modalOpen, id } = useAppSelector((state) => state.serviceState);
  useEffect(() => {
    if (id != "") {
      axios
        .get(
          `https://swdbirthdaypartybooking.somee.com/api/getaccount?Id=${id}`
        )
        .then((response) => {
          const mappedService = {
            name: response.data.data.name,
            description: response.data.data.description,
            price: response.data.data.description,
            delete_flag: response.data.data.deleteFlag,
            id: response.data.data.id,
            // Map other fields as needed
          };
          setService(mappedService);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id != "") {
      axios
        .get(
          `https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=${id}&ServiceType=dish`
        )
        .then((response) => {
          const mappedServices = response.data.data.map((value: any) => ({
            // Map fields according to the Service interface
            id: value.id, // Replace field1 with the actual field name
            name: value.name,
            description: value.name,
            price: value.price,
            // Replace field2 with the actual field name
            // Add more fields as needed
          }));
          setMenu(mappedServices);
          console.log(menu);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id != "") {
      axios
        .get(
          `https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=${id}&ServiceType=decoration`
        )
        .then((response) => {
          const mappedServices = response.data.data.map((value: any) => ({
            // Map fields according to the Service interface
            id: value.id, // Replace field1 with the actual field name
            name: value.name,
            description: value.name,
            price: value.price,
            // Replace field2 with the actual field name
            // Add more fields as needed
          }));
          setDecoration(mappedServices);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id != "") {
      axios
        .get(`https://swdbirthdaypartybooking.somee.com/api/getplace?Id=${id}`)
        .then((response) => {
          const mappedServices = response.data.data.map((value: any) => ({
            // Map fields according to the Service interface
            id: value.id, // Replace field1 with the actual field name
            name: value.name,
            description: value.description,
            price: value.price,
            address: value.address,
            // Replace field2 with the actual field name
            // Add more fields as needed
          }));
          setPlace(mappedServices);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  const handleClose = () => {
    dispatch(setIsOpen(false));
  };
  const handleRedirect = () => {
    if (service != null) {
      dispatch(setId(service.id));
      navigate("/BookingPage");
      dispatch(setIsOpen(false));
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  };

  return (
    <Dialog open={Boolean(modalOpen)} maxWidth="md" scroll="body">
      <Box sx={{ color: "white!important" }} className="bg-black min-w-[800px]	">
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
            <Box className="flex flex-col gap-4 w-[70%] relative top-[55%] left-[2%]">
              <Box className="flex items-center gap-4">
                <Avatar></Avatar>
                <Typography variant="h4">{service?.name}</Typography>

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
                <Button variant="contained" onClick={handleRedirect}>
                  Book now <ArrowForward></ArrowForward>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-col gap-4 py-4 px-8">
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Place
            </Typography>
            <Box>
              {place.map((service) => (
                <Box key={service.id} className="flex flex-col mt-4">
                  <Box className="flex flex-col gap-2">
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
                      {service.price}.000VNĐ
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
              {menu.map((service) => (
                <div key={service.id}>
                  <Card
                    sx={{
                      maxWidth: 176,
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
              {decoration.map((service) => (
                <div key={service.id}>
                  <Card
                    sx={{
                      maxWidth: 176,
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
