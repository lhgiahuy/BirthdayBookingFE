import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";
import Hero from "../components/Hero";

const RootLayoutWithBackground = () => {
  return (
    <>
      <Navbar />
      <Hero></Hero>
      <Container sx={{ minHeight: "100vh" }} maxWidth="xl">
        <Box>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default RootLayoutWithBackground;
