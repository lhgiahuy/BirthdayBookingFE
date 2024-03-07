import { Avatar, Box, Breadcrumbs, Grid, Typography, Link, Rating, Divider, Button } from "@mui/material";

import StarIcon from '@mui/icons-material/Star';

export default function FeedBack() {


    return (
        <>
            <Grid item xs={12} sm={8}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, ml: 1.25 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ color: 'white' }}
                        href="/">
                        Feedback
                    </Link>
                </Breadcrumbs>

                <Grid direction="row" container spacing={3}>
                    <Grid item>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 90, height: 90 }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" gutterBottom>
                            ABC Company
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
                                    Event Company
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>




            </Grid>

            <Typography variant="h4">
                Review
            </Typography>
            <Grid mt={2} sx={{ flexGrow: 1 }} container >
                <Grid item xs={1} container justifyContent="center"  >
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 50, height: 50 }}
                    />
                </Grid>
                <Grid item xs={11} >
                    <Grid>
                        <Typography variant="h5" gutterBottom>
                            Chuk Chuk
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Rating name="read-only" defaultValue={3.5} readOnly />
                            <Typography variant="body2" sx={{ ml: '10px', color: 'white' }}>
                                5.0
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container mt={2} mb={2} justifyContent="space-between" alignItems="center" >
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cum accusantium error dolorem numquam! Consectetur perferendis dolor tenetur unde maiores dolores repellendus hic numquam, amet dolorem quibusdam? Libero, omnis possimus.
                            </Typography>
                        </Grid>
                        <Grid mt={2} sx={{ flexGrow: 1 }} container >
                            <Grid item xs={1} container justifyContent="center"  >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 50, height: 50 }}
                                />
                            </Grid>
                            <Grid item xs={11} >
                                <Grid>
                                    <Typography variant="h5" gutterBottom>
                                        Replay
                                    </Typography>
                                </Grid>
                                <Grid container mt={2} mb={2} justifyContent="space-between" alignItems="center" >
                                    <Grid item xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cum accusantium error dolorem numquam! Consectetur perferendis dolor tenetur unde maiores dolores repellendus hic numquam, amet dolorem quibusdam? Libero, omnis possimus.
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2, border: '1px solid #FFFF' }} />
            <Grid mt={2} sx={{ flexGrow: 1 }} container >
                <Grid item xs={1} container justifyContent="center"  >
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 50, height: 50 }}
                    />
                </Grid>
                <Grid item xs={11} >
                    <Grid>
                        <Typography variant="h5" gutterBottom>
                            Chuk Chuk
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Rating name="read-only" defaultValue={3.5} readOnly />
                            <Typography variant="body2" sx={{ ml: '10px', color: 'white' }}>
                                5.0
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container mt={2} mb={2} justifyContent="space-between" alignItems="center" >
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cum accusantium error dolorem numquam! Consectetur perferendis dolor tenetur unde maiores dolores repellendus hic numquam, amet dolorem quibusdam? Libero, omnis possimus.
                            </Typography>
                        </Grid>
                        <Grid mt={2} sx={{ flexGrow: 1 }} container >
                            <Grid item xs={1} container justifyContent="center"  >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 50, height: 50 }}
                                />
                            </Grid>
                            <Grid item xs={11} >
                                <Grid>
                                    <Typography variant="h5" gutterBottom>
                                        Replay
                                    </Typography>
                                </Grid>
                                <Grid container mt={2} mb={2} justifyContent="space-between" alignItems="center" >
                                    <Grid item xs={12}>
                                        <Typography variant="body2" gutterBottom>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cum accusantium error dolorem numquam! Consectetur perferendis dolor tenetur unde maiores dolores repellendus hic numquam, amet dolorem quibusdam? Libero, omnis possimus.
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2, border: '1px solid #FFFF' }} />
            <Grid mt={2} sx={{ flexGrow: 1 }} container >
                <Grid item xs={1} container justifyContent="center"  >
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 50, height: 50 }}
                    />
                </Grid>
                <Grid item xs={11} >
                    <Grid>
                        <Typography variant="h5" gutterBottom>
                            Chuk Chuk
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Rating name="read-only" defaultValue={3.5} readOnly />
                            <Typography variant="body2" sx={{ ml: '10px', color: 'white' }}>
                                5.0
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container mt={2} mb={2} justifyContent="space-between" alignItems="center" >
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cum accusantium error dolorem numquam! Consectetur perferendis dolor tenetur unde maiores dolores repellendus hic numquam, amet dolorem quibusdam? Libero, omnis possimus.
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <Box sx={{ m: 2 }}>
                    <Button variant="contained">Show more</Button>
                </Box>
            </Grid>

        </>
    );
}