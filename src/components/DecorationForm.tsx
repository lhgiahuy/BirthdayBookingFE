import { useEffect, useState } from "react";
import Agent from "../utils/agent";
import { Service } from "../Models/Service";
import {
  Card,
  CardContent,
  CardMedia,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function DecorationForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  useEffect(() => {
    Agent.getService()
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Grid>
        <Grid container className="mt-6">
          <Grid item xs={12} className="flex justify-between items-center">
            <Typography variant="h4" sx={{ ml: 1.25 }}>
              Choose your decorations
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ ml: 1.25, mt: 3 }}>
            <TextField
              className="w-1/3"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Sets the border color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Sets the hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Sets the border color when the TextField is focused
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Sets the input text color
                  },
                },
              }}
              label="Search"
              InputLabelProps={{
                style: { color: "white" }, // Sets the label color
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup className="w-full">
              {services.map((service) => (
                <FormControlLabel
                  key={service.id} // assuming each service has a unique 'id'
                  label={
                    // this will become the text part of the label
                    <Card
                      sx={{
                        display: "flex",
                        background: "black",
                        color: "white",
                        m: 4,
                      }}
                    >
                      <Grid>
                        <CardMedia
                          className="rounded-3xl"
                          component="img"
                          sx={{ maxWidth: 380, height: 180 }}
                          image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                        />
                      </Grid>
                      <Grid
                        container
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Grid className="flex justify-between ">
                            <Grid container>
                              <Grid item xs={8}>
                                <Grid container className="justify-between">
                                  <Typography component="div" variant="h5">
                                    {service.name}
                                  </Typography>

                                  <Typography component="div" variant="h5">
                                    {service.price}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="subtitle1" component="div">
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Quae nihil quidem quisquam iure
                              placeat harum iusto, ipsa culpa repudiandae
                              perferendis rem rerum magnam, dolor qui
                              consectetur, eos provident autem natus!
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Card>
                  }
                  control={
                    <Checkbox
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  } // this is the checkbox element itself
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
