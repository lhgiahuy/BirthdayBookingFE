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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Service } from "../../Models/Service";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const linkpage = ["Profile", "Service"];

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

  const filteredDecorations = decoration.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDecoration = async () => {
    try {
      const response = await axios.get(
        'https://swdbirthdaypartybooking.somee.com/api/getservicebytype?hostId=56594440-2c26-4f1c-8ed1-a2ba037cde4e&ServiceType=f59fc2cd-fb79-4032-938b-8e3856e4a07a')
      if (response.data && response.data.success) {
        setDecoration(response.data.data)
      }
    } catch (error) {
      throw new Error();
    }

  }

  useEffect(() => {
    getDecoration()
    // console.log('data ne:', decoration)
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    const sortedDecorations = [...decoration];
    if (event.target.value === 'name') {
      sortedDecorations.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === 'price') {
      sortedDecorations.sort((a, b) => b.price - a.price);
    }
    setDecoration(sortedDecorations);
  };

  return (
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
            <Link href="/">
              <Button variant="contained" size="large">
                <Typography variant="body2" className="px-2">
                  ADD
                </Typography>
              </Button>
            </Link>
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
  );
}
