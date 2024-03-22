import {
  Box,
  Typography,
  Link,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  Rating,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppDispatch } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { Service } from "../../Models/Service";
import { Place } from "../../Models/Place";
import { Host } from "../../Models/Host";
export default function HomeHost() {
  const id = localStorage.getItem("id");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Service[]>([]);
  const [decoration, setDecoration] = useState<Service[]>([]);
  const [place, setPlace] = useState<Place[]>([]);
  const [service, setService] = useState<Host>();

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
            description: value.description,
            price: value.price,
            // Replace field2 with the actual field name
            // Add more fields as needed
          }));
          setDecoration(mappedServices);
          console.log(decoration);
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

  return (
    <Box className="flex flex-col gap-8">
      <Box
        className="min-h-screen w-full"
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <Box
          className="absolute w-full h-screen"
          sx={{
            backgroundImage:
              "linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)",
          }}
        ></Box>
        <Box className="absolute flex flex-col w-[50%] gap-8 top-[80%] left-[14rem]">
          <Box className="flex flex-col gap-4">
            <Typography variant="h2" fontWeight="bold">
              {service?.name}
            </Typography>
            <Typography>
              {service?.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sint tempore, unde atque nam quos possimus quis dolorem nisi necessitatibus nihil assumenda debitis animi eos labore voluptatibus ex, nemo dolor. Quo, fugiat itaque? Animi, dolor corporis inventore rem rerum facilis placeat nisi laboriosam aliquid fugit! Natus sint nam consequatur omnis cum voluptatibus veritatis quis odit, neque maxime nisi labore temporibus"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="flex w-full items-center justify-between">
        <Typography variant="h3">Place</Typography>
        <Link href="/Editplace">
          <Button variant="contained" size="large">
            <Typography variant="body2" className="px-3">
              Edit
            </Typography>
          </Button>
        </Link>
      </Box>
      <Box className="flex flex-col gap-8">
        {place.map((service) => (
          <Box key={service.id}>
            <Box className="flex flex-col gap-2 border-2 border-white p-8 rounded-xl">
              <Typography variant="h4">{service.name}</Typography>
              <Typography variant="subtitle1">
                {service?.description || "Dummy text if description is null"}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                Price: ${service.price}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Divider className="bg-gray-600 "></Divider>

      <Box className="flex w-full items-center justify-between">
        <Typography variant="h3">Menu</Typography>
        <Link href="/Editmenu">
          <Button variant="contained" size="large">
            <Typography variant="body2" className="px-3">
              Edit
            </Typography>
          </Button>
        </Link>
      </Box>
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
                maxWidth: 264,
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
                  <Typography variant="body2">{service.description}</Typography>
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
                    ${service.price}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Carousel>
      <Divider className="bg-gray-600 "></Divider>

      <Box className="flex w-full items-center justify-between">
        <Typography variant="h3">Decoration</Typography>
        <Link href="/Editdecoration">
          <Button variant="contained" size="large">
            <Typography variant="body2" className="px-3">
              Edit
            </Typography>
          </Button>
        </Link>
      </Box>
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
                maxWidth: 264,
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
                    {service?.description ||
                      "Dummy text if description is null"}
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
                    ${service.price}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Carousel>
    </Box>
  );
}
