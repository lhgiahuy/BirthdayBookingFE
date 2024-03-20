import { Avatar, Box, Breadcrumbs, Button, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Service } from "../../Models/Service";
import Siderbar from "../../components/SiderBar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { styled } from '@mui/material/styles';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";

export default function EditProfile() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    const uploadFile = (file: File) => {
        if (file == null) return;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImageUpload(file);
            uploadFile(file);
        }
    };


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(10%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        width: 1,
    });
    const linkpage = ["Profile", "Edit Profile"]
    const sort = ["Place", "Price"];
    const [services, setServices] = useState<Service[]>([]);
    useEffect(() => {
        axios.get('https://65e1a8d6a8583365b316f7df.mockapi.io/api/service')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (


        <Grid container className="h-auto">
            <Grid item xs={4} md={4}>
                <Siderbar />
            </Grid>
            <Grid item xs={8} md={8}>
                <Box className="h-auto w-auto ">
                    <Breadcrumbs aria-label="breadcrumb" color="white">
                        {linkpage.map((linkpages) =>
                            <Link
                                underline="hover"
                                sx={{ color: 'white' }}
                                href="/"
                            >
                                {linkpages}
                            </Link>
                        )}
                    </Breadcrumbs>
                    <Box className="mt-4">
                        <Typography variant="h3">
                            Edit Profile
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'white', mb: 3, mt: 1 }} />
                <Grid container>
                    <Grid item xs>
                        {imageUrls.length > 0 && (
                            <Avatar
                                alt="Uploaded Image"
                                src={imageUrls[imageUrls.length - 1]}
                                sx={{ width: 100, height: 100 }}
                            />
                        )}
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={handleImageChange}
                            hidden
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <ModeEditIcon />
                            </IconButton>
                        </label>

                        {/* <Avatar variant="rounded" alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100 }}>
                            <label htmlFor="icon-button-file">
                                <IconButton sx={{
                                    position: 'absolute',
                                    bottom: 0, // Canh chỉnh xuống phía dưới cùng
                                    left: 0,
                                }} color="secondary" aria-label="fingerprint" component="span">
                                    <ModeEditIcon />
                                </IconButton>
                                <VisuallyHiddenInput accept="*" id="icon-button-file" type="file" />
                            </label>
                        </Avatar> */}
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6" sx={{ mb: 1, ml: 1 }}>Name</Typography>
                        <FormControl className="w-2/3" sx={{ mx: 1 }}>
                            <InputLabel sx={{ color: 'white', "&.Mui-focused": { display: 'none' }, shrink: 'false' }}>
                                Name
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'white', // Màu chữ nhập vào
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Màu viền mặc định
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white', // Màu viền khi được focus
                                        },
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white', // Màu của InputAdornment
                                    },
                                    'input:valid + fieldset': {
                                        borderColor: 'white', // Màu viền khi input valid
                                    },
                                    'input:invalid + fieldset': {
                                        borderColor: 'white', // Màu viền khi input invalid
                                    },
                                    'input:valid:focus + fieldset': {
                                        borderColor: 'white', // Màu viền khi input valid và focus
                                    },
                                    // Loại bỏ hoàn toàn tất cả các hiệu ứng khi chuột hover
                                    '&:hover .MuiInputAdornment-root, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'inherit', // dùng 'inherit' hoặc màu của border mà bạn muốn duy trì
                                    },

                                }}

                            />
                        </FormControl>
                        <Typography variant="h6" sx={{ m: 1 }}>Email</Typography>
                        <FormControl className="w-2/3" sx={{ mx: 1 }}>
                            <InputLabel sx={{ color: 'white', "&.Mui-focused": { display: 'none' }, shrink: 'false' }}>
                                Email
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'white', // Màu chữ nhập vào
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Màu viền mặc định
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white', // Màu viền khi được focus
                                        },
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white', // Màu của InputAdornment
                                    },
                                    'input:valid + fieldset': {
                                        borderColor: 'white', // Màu viền khi input valid
                                    },
                                    'input:invalid + fieldset': {
                                        borderColor: 'white', // Màu viền khi input invalid
                                    },
                                    'input:valid:focus + fieldset': {
                                        borderColor: 'white', // Màu viền khi input valid và focus
                                    },
                                    // Loại bỏ hoàn toàn tất cả các hiệu ứng khi chuột hover
                                    '&:hover .MuiInputAdornment-root, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'inherit', // dùng 'inherit' hoặc màu của border mà bạn muốn duy trì
                                    },

                                }}

                            />
                        </FormControl>
                        <Typography variant="h6" sx={{ m: 1 }}>Phone</Typography>
                        <FormControl className="w-2/3" sx={{ mx: 1 }}>
                            <InputLabel sx={{ color: 'white', "&.Mui-focused": { display: 'none' }, shrink: 'false' }}>
                                Phone
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    color: 'white', // Màu chữ nhập vào
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Màu viền mặc định
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white', // Màu viền khi được focus
                                        },
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white', // Màu của InputAdornment
                                    },
                                    'input:valid + fieldset': {
                                        borderColor: 'white', // Màu viền khi input valid
                                    },
                                    'input:invalid + fieldset': {
                                        borderColor: 'white', // Màu viền khi input invalid
                                    },
                                    'input:valid:focus + fieldset': {
                                        borderColor: 'white', // Màu viền khi input valid và focus
                                    },
                                    // Loại bỏ hoàn toàn tất cả các hiệu ứng khi chuột hover
                                    '&:hover .MuiInputAdornment-root, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'inherit', // dùng 'inherit' hoặc màu của border mà bạn muốn duy trì
                                    },

                                }}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} className="flex justify-end py-14 ">
                        <Button variant="contained">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid >
        </Grid >

    );
}
