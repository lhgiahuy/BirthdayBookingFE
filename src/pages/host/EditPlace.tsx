import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Drawer,
  Tooltip,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Place } from "../../Models/Place";
import { Host } from "../../Models/Host";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 450,
  bgcolor: "palette.common.black",
  borderRadius: "16px",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

export default function EditPlace() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [mode, setMode] = useState<"add" | "update">("add"); // Add mode by default
  const [open, setOpen] = React.useState(false);
  const [placeId, setPlaceId] = useState("");
  const id = localStorage.getItem("id");
  const [service, setService] = useState<Host>();

  const handleOpen = () => {
    setMode("add");
    setPlaceId("");
    setName("");
    setAddress("");
    setDescription("");
    setPrice(0);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleUpdate = (item: Place) => {
    setMode("update");
    setPlaceId(item.id);
    setName(item.name);
    setAddress(item.address);
    setDescription(item.description);
    setPrice(item.price);
    setOpen(true);
  };

  const hostId = localStorage.getItem("id");

  const token = localStorage.getItem("access_token");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredDecorations = places.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    const sortedPlaces = [...places];
    if (event.target.value === "name") {
      sortedPlaces.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === "price") {
      sortedPlaces.sort((a, b) => b.price - a.price);
    }
    setPlaces(sortedPlaces);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://swdbirthdaypartybooking.somee.com/api/deleteplace/${id}`
      );
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
    } catch (error) {
      throw new Error();
    }
  };

  const handleAddPlace = async () => {
    const newPlaceData = {
      hostId,
      name,
      address,
      description,
      price,
    };

    try {
      const response = await axios.post(
        "https://swdbirthdaypartybooking.somee.com/api/createplace",
        newPlaceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      handleClose();
      if (response.data.success) {
        handleClose();
        getPlaces();
      } else {
        throw new Error("Something went wrong", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdatePlace = async (id: string) => {
    const newPlaceData = {
      hostId,
      name,
      address,
      description,
      price,
    };

    try {
      const response = await axios.put(
        `https://swdbirthdaypartybooking.somee.com/api/updateplace/${id}`,
        newPlaceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      handleClose();
      if (response.data.success) {
        handleClose();
        getPlaces();
      } else {
        throw new Error("Something went wrong", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPlaces = async () => {
    try {
      const response = await axios.get(
        `https://swdbirthdaypartybooking.somee.com/api/getplace?id=${hostId}`
      );
      // console.log('API Response:', response.data); // Log the response to understand its structure

      if (response.data && response.data.success) {
        setPlaces(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);
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
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Link to="/Homehost">
            <Button variant="text">
              <ArrowBackIcon sx={{ mr: 2 }}></ArrowBackIcon> Back
            </Button>
          </Link>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ mt: 2, ml: 1.25, color: "white" }}
          >
            {service?.name}
          </Typography>
        </Grid>
        <Typography gutterBottom sx={{ ml: 1.25, color: "white" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          eos nostrum repudiandae facere molestias, eum recusandae commodi
          provident sit, enim officia, officiis sed. Ab, deserunt! Deserunt
          doloribus perferendis delectus sed?
        </Typography>
        <Grid item xs={12} sx={{ margin: "2rem 0" }}>
          <Divider className="bg-gray-600 w-full"></Divider>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            className="flex justify-between items-center py-4"
            justifyContent="space-between"
          >
            <Grid item xs={10}>
              <Typography variant="h3" sx={{ ml: 1.25 }}>
                Place
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" size="large" onClick={handleOpen}>
                <Typography variant="body2" className="px-2">
                  ADD
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            className="flex justify-between py-4"
            justifyContent="space-between"
          >
            <Grid item xs={10}>
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& label": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },

                  "& .MuiInputBase-input": {
                    color: "white", // Thiết lập màu chữ cho input ở đây nếu cần
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                className="w-1/2"
                label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="contained-select-currency"
                select
                label="Sort"
                onChange={handleSortChange}
                helperText="Please select your currency"
                sx={{
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& label": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },

                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              >
                <MenuItem value="name">Name</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box className="flex flex-col gap-8">
              {filteredDecorations.map((service) => (
                <Box key={service.id}>
                  <Box className="flex flex-col gap-2 border-2 border-white p-8 rounded-xl">
                    <Box className="flex gap-4 items-center">
                      <Typography variant="h4">{service.name}</Typography>
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            color="info"
                            onClick={() => handleUpdate(service)}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            color="error"
                            onClick={() => handleDelete(service.id)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Typography variant="subtitle1">
                      {service?.description ||
                        "Dummy text if description is null"}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      Price: ${service.price}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Drawer open={open} onClose={handleClose}>
        <Box className="w-[600px] flex flex-col justify-start p-16 bg-black h-full gap-16">
          <Typography variant="h4" color="primary">
            {mode === "add" ? "Add A New Place" : "Update Place"}
          </Typography>
          <Box className="flex w-full flex-col gap-8">
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </Box>
          <Box className="w-full flex">
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={
                mode === "add"
                  ? handleAddPlace
                  : () => handleUpdatePlace(placeId)
              }
            >
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
