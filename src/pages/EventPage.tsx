import { Box, Typography } from "@mui/material";
import CardCarousel from "../components/Card";
import PartyDetail from "../components/PartyDetail";
import agent from "../utils/agent2";
import { AxiosError } from "axios";
import { useEffect } from "react";

export default function EventPage() {
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
