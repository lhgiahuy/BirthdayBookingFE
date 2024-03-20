import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Typography } from "@mui/material";
import { Service } from "../Models/Service";
import CardCarousel from "../components/Card";
import ExpandableCard from "../components/ExpandableCard";
import PartyDetail from "../components/PartyDetail";

export default function EventPage() {
  const [services, setServices] = useState<Service[]>([]);
  const pages = ["Sort by"];

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
    <Box className="flex relative flex-col gap-24 px-[3rem] mt-[-4rem]">
      <Box className="flex flex-col gap-4">
        <Typography variant="h6">Top rate party</Typography>
        <CardCarousel start={0} end={4}></CardCarousel>
      </Box>
      <Box className="flex flex-col gap-4">
        <Typography variant="h6">Party</Typography>
        <CardCarousel start={4} end={8}></CardCarousel>
      </Box>
      <PartyDetail></PartyDetail>
    </Box>
  );
}
