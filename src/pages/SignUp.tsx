import { Box, CssBaseline, Grid, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EzentLogo from './EzentLogo';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



export default function Signup() {
    return (
        <>
            <ThemeProvider theme>
                <Grid container component="main" sx={{ height: '100vh' }} >
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ bgcolor: 'black' }}>

                        <Box
                            sx={{
                                my: 8,
                                mx: 9,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'white'
                            }}
                        >
                            {/* <LoginIcon fontSize="large" style={{ fontSize: '20 rem' }} /> */}
                            <EzentLogo />
                            <Typography component="h1" variant="h3" sx={{ mt: 16 }} >
                                Sign up
                            </Typography>
                            {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
                            <Box component="form" sx={{ mt: 1 }} >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'white',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                        },
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'white',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                        },
                                    }}
                                />


                                <Grid container justifyContent="flex-end">
                                    <Link href="#" variant="body2" underline="none" color="white">
                                        {"Already have an account yet? Log in here"}
                                    </Link>
                                </Grid>


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign up
                                    <KeyboardArrowRightIcon />
                                </Button>

                                <Grid sx={{ mt: 15 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam iure nihil porro, illo nostrum repudiandae quasi enim quisquam molestiae reiciendis placeat est adipisci ratione commodi necessitatibus consectetur fugiat minima in.</Grid>

                                {/* <Copyright sx={{ mt: 5 }} /> */}
                            </Box>
                        </Box>
                    </Grid>


                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={8}
                        sx={{
                            backgroundImage: 'url(https://www.jalexanders.com/wp-content/uploads/2022/09/decorations.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                </Grid>


            </ThemeProvider>
        </>
    )
}

