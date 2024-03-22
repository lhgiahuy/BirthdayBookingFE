import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Modal,
  Avatar,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const linkpage = ["Profile", "Service"];


interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 450,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(10%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  width: 1,
});

export default function EditMenu() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };


  const [menu, setMenu] = useState<Menu[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hostId = localStorage.getItem("id");
  const token = localStorage.getItem("access_token");
  const serviceTypeId = '523856cb-8dc4-43b9-b880-5ac2214320e6'

  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [price, setPrice] = useState('');

  const handleAddMenu = async () => {
    const newDish = {
      name,
      description,
      imageURL,
      price,
      serviceTypeId,
      hostId
    }
    try {
      const response = await axios.post(
        "https://swdbirthdaypartybooking.somee.com/api/createservice",
        newDish,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });


      console.log("Response ne :", response.data);
      handleClose();
      if (response.data.success) {

        handleClose();

        getMenu();
      } else {

        throw new Error('Something went wrong', response.data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }

  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://swdbirthdaypartybooking.somee.com/api/deleteservice/${id}`);
      setMenu(prevMenu => prevMenu.filter(menu => menu.id !== id));
    } catch (error) {
      throw new Error;
    }
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  // const uploadFile = (file: File) => {
  //   if (file == null) return;
  //   const imageRef = ref(storage, `images/${file.name + v4()}`);
  //   uploadBytes(imageRef, file).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageURL((prev) => [...prev, url]);
  //     });
  //   });
  // };
  const uploadFile = (file: File) => {
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL((prev) => [...prev, url]);
      }).catch(error => {
        console.error("Error getting download URL:", error);
      });
    }).catch(error => {
      console.error("Error uploading file:", error);
    });
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageUpload(file);
      uploadFile(file);
    }
  };


  const filteredDecorations = menu.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const getMenu = async () => {
    try {
      const response = await axios.get(
        `https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=${hostId}&ServiceType=523856cb-8dc4-43b9-b880-5ac2214320e6`
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

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    const sortedMenu = [...menu];
    if (event.target.value === 'name') {
      sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === 'price') {
      sortedMenu.sort((a, b) => b.price - a.price);
    }
    setMenu(sortedMenu);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Breadcrumbs
            aria-label="breadcrumb"
            color="white"
            sx={{ mt: 2, ml: 1.25 }}
          >
            {linkpage.map((linkpages) => (
              <Link className="hover:no-underline" href="/">
                <Typography className="text-white"> {linkpages}</Typography>
              </Link>
            ))}
            ;
          </Breadcrumbs>

          <Typography
            variant="h1"
            gutterBottom
            sx={{ mt: 2, ml: 1.25, color: "white" }}
          >
            Event
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
                Menu
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
            {filteredDecorations.map(item => (
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
                <Grid>
                  <CardMedia
                    className="rounded-3xl"
                    component="img"
                    sx={{ maxWidth: 380, height: 180 }}
                    image="https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg"
                  />
                </Grid>
                <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Grid
                      className="flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <Grid className="flex ">
                        <Typography component="div" variant="h5">
                          {item.name}
                        </Typography>

                        <Box className="flex ml-2">
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            color="primary"
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            color="error"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </Grid>

                      <Typography component="div" variant="h5">
                        {item.price} VND
                      </Typography>
                    </Grid>

                    <Typography variant="subtitle1" component="div">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} >
          <Typography variant="h4" gutterBottom style={{ color: 'black' }} sx={{ textAlign: 'center' }}>
            Add A New Place
          </Typography>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}

          />
          {/* <TextField
            id="imageURL"
            label="imageURL"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={imageURL}
            onChange={(e) => setImageURL(e.target)}
          /> */}
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            margin="normal"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* dang fix upload image */}
          {/* {imageURL.length > 0 && (
            <Avatar
              alt="Uploaded Image"
              src={imageURL.length > 0 ? imageURL[imageURL.length - 1] : ''} // Display the last uploaded image URL
              sx={{ width: 100, height: 100 }}
            />
          )}
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
            hidden
          // value={imageURL}
          />
          <label htmlFor="icon-button-file">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </label> */}

          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'block', margin: '13px auto 0' }}
            onClick={handleAddMenu} >
            Add
          </Button>
        </Box>

      </Modal>
    </>
  );
}
