import {
    Box,
    Grid,
    Typography,
    Breadcrumbs,
    Link,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    IconButton,
    MenuItem,
    Modal,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const linkpage = ["Profile", "Service"];

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


export default function EditPlace() {
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

    interface Place {
        id: string;
        name: string;
        description: string;
        address: string;
        price: number;
    }

    const [places, setPlaces] = useState<Place[]>([]);
    const [sortBy, setSortBy] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        if (event.target.value === 'name') {
            sortedPlaces.sort((a, b) => a.name.localeCompare(b.name));
        } else if (event.target.value === 'price') {
            sortedPlaces.sort((a, b) => b.price - a.price);
        }
        setPlaces(sortedPlaces);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://swdbirthdaypartybooking.somee.com/api/deleteplace/${id}`);
            setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
        } catch (error) {
            throw new Error;
        }
    };

    const [name, setName] = useState("");
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddPlace = async () => {

        const newPlaceData = {
            hostId,
            name,
            address,
            description,
            price
        }


        try {
            const response = await axios.post(
                "https://swdbirthdaypartybooking.somee.com/api/createplace",
                newPlaceData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


            console.log("Response:", response.data);
            handleClose();
            if (response.data.success) {

                handleClose();

                getPlaces();
            } else {

                throw new Error('Something went wrong', response.data.message);
            }

        } catch (error) {
            console.error('Error:', error);
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
                        {filteredDecorations.map((place) => (
                            <Card
                                sx={{ display: "flex", background: "black", color: "white" }}
                            >
                                <Grid
                                    sx={{ display: "flex", flexDirection: "row" }}
                                    key={place.id}
                                >
                                    <CardContent sx={{ flex: "1 0 auto" }}>
                                        <Box>
                                            <Box className="flex items-center">
                                                <Typography component="div" variant="h4">
                                                    {place.name}
                                                </Typography>
                                                <Box>
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
                                                        onClick={() => handleDelete(place.id)}
                                                    >
                                                        <DeleteIcon fontSize="inherit" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Typography component="div" variant="subtitle1">
                                            {place.address}
                                        </Typography>

                                        <Typography variant="subtitle1" component="div">
                                            {place.description}
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
                    <TextField
                        id="address"
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ display: 'block', margin: '16px auto 0' }}
                        onClick={handleAddPlace} >
                        Add
                    </Button>
                </Box>

            </Modal>
        </>
    );
}
