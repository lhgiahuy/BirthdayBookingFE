import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: "100vh" }} maxWidth="lg" className="mt-10">
        <Box>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default RootLayout;
