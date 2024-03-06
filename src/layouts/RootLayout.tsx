
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";
function App() {
    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <Box>
                    <Outlet />
                </Box>
            </Container>
            <Footer />
        </>
    );
}

export default App;
