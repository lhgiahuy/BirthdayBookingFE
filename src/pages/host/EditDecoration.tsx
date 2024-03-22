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
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import { styled } from "@mui/material/styles";

const linkpage = ["Profile", "Service"];


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 500,
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

export default function EditDecoration() {
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

  interface Decoration {
    id: string,
    name: string,
    description: string,
    price: number
  }
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const closeModalUpdate = () => setOpenUpdate(false);

  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  // const openUpdate = () => setOpen(true);


  const hostId = localStorage.getItem("id");
  const token = localStorage.getItem("access_token");
  const serviceTypeId = '523856cb-8dc4-43b9-b880-5ac2214320e6'
  const serviceType = 'decoration'

  const [name, setName] = useState("");
  const [itemId, setItemId] = useState("");
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');


  const handleAddDecoration = async () => {
    const newDecor = {
      name,
      description,
      imageURL,
      price,
      serviceType,
      hostId
    }

    console.log('newDecor: ', newDecor)
    try {
      const response = await axios.post(
        "https://swdbirthdaypartybooking.somee.com/api/createservice",
        newDecor,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      console.log("Response ne :", response.data);
      closeModal();
      if (response.data.success) {

        closeModal();

        getDecoration();
      } else {

        throw new Error('Something went wrong', response.data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }

  }

  const uploadFile = (file: File) => {
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setImageURL(url); // Set the imageURL directly with the URL
        console.log('imageurl:', imageURL)
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageUpload(file);
      uploadFile(file);
      console.log('file', imageUpload)
    }
  };

  const [decoration, setDecoration] = useState<Decoration[]>([])
  const [sortBy, setSortBy] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://swdbirthdaypartybooking.somee.com/api/deleteservice/${id}`);
      setDecoration(prevDecor => prevDecor.filter(decoration => decoration.id !== id));
    } catch (error) {
      throw new Error;
    }
  };


  const handleEditClick = (id: string) => {

    setOpenUpdate(true);
    setItemId(id);
  }

  const handleUpdate = async (itemId: string) => {

    console.log("item id: ", itemId)

    const updateDecor = {
      name,
      description,
      imageURL,
      price,
      serviceTypeId
    }

    try {
      const response = await axios.put(
        `https://swdbirthdaypartybooking.somee.com/api/updateservice/${itemId}`,
        updateDecor);

      console.log("Response ne :", response.data);
      // closeModalUpdate();
      const status = response.data
      console.log("status ne :", status);
      if (status.success == true) {
        <Alert severity="success">This is a success Alert.</Alert>
        console.log("Response neee:", response);

        getDecoration();
        closeModalUpdate();
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw new Error;
    }
  }

  const filteredDecorations = decoration.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDecoration = async () => {
    try {
      const response = await axios.get(
        `https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=${hostId}&ServiceType=${serviceType}`
      )
      console.log("API Response:", response.data);
      if (response.data && response.data.success) {
        setDecoration(response.data.data)
      }

    } catch (error) {
      throw new Error();
    }

  }

  useEffect(() => {
    getDecoration()
    console.log('data ne:', decoration)
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    const sortedDecorations = [...decoration];
    if (event.target.value === 'name') {
      sortedDecorations.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === 'price') {
      sortedDecorations.sort((a, b) => a.price - b.price);
    }
    setDecoration(sortedDecorations);
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
                Decoration
              </Typography>
            </Grid>
            <Grid item xs={1}>

              <Button variant="contained" size="large" onClick={openModal}>
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
                            onClick={() => handleEditClick(item.id)}
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

      {/* updateItem */}
      <Modal
        open={openUpdate}
        onClose={closeModalUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography variant="h4" gutterBottom style={{ color: 'black' }} sx={{ textAlign: 'center' }}>
            Edit Decoration
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

          <Grid className="flex" sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>

            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
              style={{ position: 'absolute', opacity: 0 }}
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
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <img
                  src={imageURL} alt="Uploaded Image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100px',
                    borderRadius: '5%',
                  }} />
              </Box>
            )}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'block', margin: '13px auto 0' }}
            onClick={() => handleUpdate(itemId)} >
            Edit
          </Button>
        </Box>

      </Modal>


      {/* addItem */}
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography variant="h4" gutterBottom style={{ color: 'black' }} sx={{ textAlign: 'center' }}>
            Add A Decoration
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

          <Grid className="flex" sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>

            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
              style={{ position: 'absolute', opacity: 0 }}
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
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <img
                  src={imageURL} alt="Uploaded Image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100px',
                    borderRadius: '5%',
                  }} />
              </Box>
            )}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'block', margin: '13px auto 0' }}
            onClick={handleAddDecoration} >
            Add
          </Button>
        </Box>

      </Modal>
    </>
  );
}
