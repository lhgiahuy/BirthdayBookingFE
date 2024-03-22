import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Drawer,
  Tooltip,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { Service } from "../../Models/Service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Host } from "../../Models/Host";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(10%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  width: 1,
});

export default function EditDecoration() {
  const [menu, setMenu] = useState<Service[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const hostId = localStorage.getItem("id");
  const token = localStorage.getItem("access_token");
  const serviceTypeId = "f59fc2cd-fb79-4032-938b-8e3856e4a07a";
  const serviceType = "decoration";
  const [mode, setMode] = useState<"add" | "update">("add"); // Add mode by default
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [dishId, setDishId] = useState("");
  const [price, setPrice] = useState("");
  const id = localStorage.getItem("id");
  const [service, setService] = useState<Host>();

  const handleOpen = () => {
    setMode("add");
    setName("");
    setPrice("");
    setImageURL("");
    setDescription("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleUpdate = (item: Service) => {
    setMode("update");
    setName(item.name);
    setPrice(item.price.toString());
    setImageURL(item.image_URL);
    setDescription(item.description);
    setDishId(item.id);
    setOpen(true);
  };

  const handleAddDish = async () => {
    const newDish = {
      name,
      description,
      imageURL,
      price,
      serviceType,
      hostId,
    };

    console.log("newdish: ", newDish);
    try {
      const response = await axios.post(
        "https://swdbirthdaypartybooking.somee.com/api/createservice",
        newDish,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response ne :", response.data);
      handleClose();

      if (response.data.success) {
        handleClose();
        getMenu();
      } else {
        throw new Error("Something went wrong", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateDish = async (id: string) => {
    const newDish = {
      name,
      description,
      imageURL,
      price,
      serviceTypeId,
      hostId,
    };

    console.log("newdish: ", newDish);
    try {
      const response = await axios.put(
        `https://swdbirthdaypartybooking.somee.com/api/updateservice/${id}`,
        newDish,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response ne :", response.data);
      handleClose();

      if (response.data.success) {
        handleClose();
        getMenu();
      } else {
        throw new Error("Something went wrong", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://swdbirthdaypartybooking.somee.com/api/deleteservice/${id}`
      );
      setMenu((prevMenu) => prevMenu.filter((menu) => menu.id !== id));
    } catch (error) {
      throw new Error();
    }
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadFile = (file: File) => {
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setImageURL(url); // Set the imageURL directly with the URL
        console.log("imageurl:", imageURL);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageUpload(file);
      uploadFile(file);
      console.log("file", imageUpload);
    }
  };

  const filteredDecorations = menu.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMenu = async () => {
    try {
      const response = await axios.get(
        `https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=${hostId}&serviceType=${serviceType}`
      );
      console.log("API Response:", response.data);
      if (response.data && response.data.success) {
        setMenu(response.data.data); // Assuming menu data is within response.data.data
      } else {
        console.log("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMenu();
    console.log("menu ne: ", menu);
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

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    const sortedMenu = [...menu];
    if (event.target.value === "name") {
      sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === "price") {
      sortedMenu.sort((a, b) => b.price - a.price);
    }
    setMenu(sortedMenu);
  };
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
        <Grid container>
          <Grid
            item
            xs={12}
            className="flex justify-between items-center py-4"
            justifyContent="space-between"
          >
            <Grid item xs={10}>
              <Typography variant="h3" sx={{ ml: 1.25 }}>
                Decoration
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
                <MenuItem value="price">Price</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* {Array.isArray(menu) &&
            menu.map((item) => ( */}
            {filteredDecorations.map((item) => (
              <Card
                sx={{
                  display: "flex",
                  background: "black",
                  color: "white",
                  mt: 4,
                  mb: 4,
                }}
                key={item.id}
              >
                <Grid sx={{ marginRight: 4 }}>
                  <CardMedia
                    className="rounded-3xl"
                    component="img"
                    sx={{ maxWidth: 380, height: 180, marginRight: 4 }}
                    image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                  />
                </Grid>
                <Grid container>
                  <Box>
                    <Grid>
                      <Grid>
                        <Box className="flex gap-4 items-center">
                          <Typography component="div" variant="h4">
                            {item.name}
                          </Typography>
                          <Box>
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="delete"
                                size="medium"
                                color="info"
                                onClick={() => handleUpdate(item)}
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                size="medium"
                                color="error"
                                onClick={() => handleDelete(item.id)}
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle1" sx={{ margin: "1.5rem 0" }}>
                      {item.description}
                    </Typography>
                    <Typography variant="h5">{item.price}</Typography>
                  </Box>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Drawer open={open} onClose={handleClose}>
        <Box className="w-[600px] flex flex-col justify-start p-16 bg-black h-full gap-8">
          <Typography variant="h4" color="primary">
            {mode === "add" ? "Add A New Decoration" : "Update Decoration"}
          </Typography>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
          />

          <Grid
            className="flex"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
              style={{ position: "absolute", opacity: 0 }}
              // hidden
            />
            <label htmlFor="icon-button-file">
              <Button
                component="span"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </label>
            {imageURL && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={imageURL}
                  alt="Uploaded Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100px",
                    borderRadius: "5%",
                  }}
                />
              </Box>
            )}
          </Grid>

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={
              mode === "add" ? handleAddDish : () => handleUpdateDish(dishId)
            }
          >
            {mode === "add" ? "Add" : "Update"}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
