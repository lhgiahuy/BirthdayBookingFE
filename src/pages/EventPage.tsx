import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Typography } from "@mui/material";
import { Service } from "../Models/Service";
import CardCarousel from "../components/Card";
import ExpandableCard from "../components/ExpandableCard";

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
    // <Grid container>
    //   <Grid item xs={12}>
    //     <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, ml: 1.25 }}>
    //       <Link
    //         underline="hover"
    //         color="inherit"
    //         sx={{ color: "white" }}
    //         href="/"
    //       >
    //         Events
    //       </Link>
    //     </Breadcrumbs>

    //     <Typography
    //       variant="h3"
    //       gutterBottom
    //       sx={{ mt: 2, ml: 1.25, color: "white" }}
    //     >
    //       Event
    //     </Typography>
    //     <Typography gutterBottom sx={{ mt: 1, ml: 1.25, color: "white" }}>
    //       Many choices for you
    //     </Typography>
    //     <Box className="flex w-full justify-end">
    //       {pages.map((page) => (
    //         <FormControl
    //           size="small"
    //           key={page}
    //           sx={{
    //             marginRight: "16px",
    //             minWidth: 200,
    //             color: "white",
    //             ".MuiOutlinedInput-notchedOutline": {
    //               borderColor: "white",
    //               color: "white",
    //             },
    //             ".MuiInputLabel-root": {
    //               color: "white!important",
    //             },
    //           }}
    //         >
    //           <InputLabel sx={{ color: "white" }} id={`select-${page}-label`}>
    //             {page}
    //           </InputLabel>
    //           <Select
    //             labelId={`select-${page}-label`}
    //             id={`select-${page}`}
    //             label={page}
    //             sx={{
    //               color: "white",
    //               "& .MuiSelect-icon": { color: "white" },
    //               "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //                 borderColor: "white",
    //               },
    //               "&:hover .MuiOutlinedInput-notchedOutline": {
    //                 borderColor: "white",
    //               },
    //               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                 borderColor: "white",
    //               },
    //             }}
    //           >
    //             <MenuItem value="">
    //               <em>None</em>
    //             </MenuItem>
    //             <MenuItem value={10}>Ten</MenuItem>
    //             <MenuItem value={20}>Twenty</MenuItem>
    //             <MenuItem value={30}>Thirty</MenuItem>
    //             {/* ... */}
    //           </Select>
    //         </FormControl>
    //       ))}
    //     </Box>
    //   </Grid>
    //   <Grid item xs={12} sx={{ flexGrow: 1 }}>
    //     <Box>
    //       <Grid container spacing={2}>
    //         {services.map((service) => (
    //           <ServiceCard
    //             key={service.id}
    //             id={service.id}
    //             name={service.name}
    //             description={service.description}
    //             image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
    //             rating="5.0"
    //             price={service.price}
    //           />
    //         ))}
    //       </Grid>
    //     </Box>
    //   </Grid>
    // </Grid>
    <Box className="flex relative flex-col gap-24 px-[3rem] mt-[-4rem]">
      <Box className="flex flex-col gap-4">
        <Typography variant="h6">Top rate party</Typography>
        <CardCarousel start={0} end={4}></CardCarousel>
      </Box>
      <Box className="flex flex-col gap-4">
        <Typography variant="h6">Party</Typography>
        <CardCarousel start={4} end={8}></CardCarousel>
      </Box>
    </Box>
  );
}
