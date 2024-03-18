import { ArrowForward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Box
      className="min-h-screen w-full"
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1621857524725-fdfeae3465dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <Box
        className="absolute w-full h-full"
        sx={{
          backgroundImage:
            "linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)",
        }}
      ></Box>
      <Box className="absolute flex flex-col w-[50%] gap-8 top-[40%] left-[4rem]">
        <Typography variant="h2" fontWeight="bold">
          Birthday Booking
        </Typography>
        <Typography variant="subtitle1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          rem placeat nihil hic enim sit, dolorem velit quae, commodi ab
          officiis repudiandae quos, quibusdam soluta quaerat? Sequi quae
          aspernatur provident.
        </Typography>
        <Box>
          <Link
            to="/"
            className="text-lg font-bold text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Book now <ArrowForward></ArrowForward>
          </Link>
          <Link
            to="/"
            className="text-lg font-bold text-white border border-gray-300 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            About us
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
