
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import {
    Box, Grid, Typography, Breadcrumbs, Link, FormControl, InputLabel,
    Select, MenuItem, Button, Container
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Slide from '../../components/CaroulselBooking';




export default function BookingPage() {

    const pages = ["Date", "Place"];
    return (


        <Grid>
            <Grid item xs={12} sm={8}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, ml: 1.25 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ color: 'white' }}
                        href="/">
                        BOOKING
                    </Link>
                </Breadcrumbs>

                <Grid direction="row" container spacing={3}>
                    <Grid item>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 80, height: 80 }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Birthday Party for kids
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <StarIcon sx={{ color: 'gold' }} />
                            <Typography variant="body2" sx={{ ml: '10px', color: 'white' }}>
                                5.0
                            </Typography>
                        </Box>
                        <Grid container justifyContent="space-between" alignItems="center" >
                            <Grid item>
                                <Typography variant="body2" gutterBottom>
                                    Birthday Party for kids
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" endIcon={<FavoriteIcon />}>
                                    LIKE
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography gutterBottom sx={{ mt: 1, ml: 1.25, color: 'white' }}>
                    Many choices for you
                </Typography>


                {pages.map((page) => (

                    <FormControl key={page} sx={{ m: 1, minWidth: 400, color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}>
                        <InputLabel sx={{ color: 'white' }} id={`select-${page}-label`}>
                            {page}
                        </InputLabel>
                        <Select
                            labelId={`select-${page}-label`}
                            id={`select-${page}`}
                            label={page}
                            sx={{
                                color: 'white',
                                '& .MuiSelect-icon': { color: 'white' },
                                '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            {/* ... */}
                        </Select>
                    </FormControl>

                ))}

            </Grid>

            <Grid item xs={12} >
                <Typography variant="h5" gutterBottom sx={{ mt: 5, ml: 1.25, color: 'white' }}>
                    Food
                </Typography>
            </Grid>
            <Grid item xs={12} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Grid>
                    <Slide />
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom sx={{ mt: 1, ml: 1.25, color: 'white' }}>
                Drink
            </Typography>
            <Grid item xs={12} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Grid >
                    <Slide />
                </Grid>
            </Grid>
        </Grid>


    );
}