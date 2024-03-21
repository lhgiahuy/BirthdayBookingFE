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
import { Service } from "../../Models/Service";
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
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredDecorations = places.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPlaces = async () => {
        try {
            const response = await axios.get(
                "https://swdbirthdaypartybooking.somee.com/api/getplace?id=114e9f53-7fc3-4e3a-944f-2d5e66c65410"
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
        console.log("data ne: ", places);
    }, []);

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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
