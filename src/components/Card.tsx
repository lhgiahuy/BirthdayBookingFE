import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Ensure you are importing the right CSS file for 'react-multi-carousel'

interface Service {
  name: string;
  description: string;
  price: string;
  service_type_id: number;
  host_id: number;
  delete_flag: boolean;
  id: string;
}

interface CarouselProps {
  deviceType?: string;
}

export default function CardCarousel(props: CarouselProps) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://65e1a8d6a8583365b316f7df.mockapi.io/api/service"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
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
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  color: "white",
                  maxWidth: "320px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                  />
                </CardActionArea>
              </Card>
            </div>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}
