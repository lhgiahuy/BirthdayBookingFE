import { Avatar, Box, Breadcrumbs, Button, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { Service } from "../../Models/Service";
import Siderbar from "../../components/SiderBar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { styled } from '@mui/material/styles';

export default function ChangePasswordHost() {
    const linkpage = ["Profile", "Change Password"]
    const [services, setServices] = useState<Service[]>([]);

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
                            Change Password
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'white', mb: 3, mt: 1 }} />
                <Grid container>
                    <Grid item xs={10}>
                        <FormControl className="w-2/3" sx={{ mx: 1 }}>
                            <InputLabel sx={{ color: 'white', "&.Mui-focused": { display: 'none' }, shrink: 'false' }}>
                                New Password
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
                        <FormControl className="w-2/3" sx={{ mx: 1, my: 5 }}>
                            <InputLabel sx={{ color: 'white', "&.Mui-focused": { display: 'none' }, shrink: 'false' }}>
                                Again Password
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
                    <Grid item xs={10} className="flex justify-end pt-10 pb-40 ">
                        <Button variant="contained">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid >
        </Grid >

    );
}
