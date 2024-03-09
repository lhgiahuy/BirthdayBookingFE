import { Avatar, Box, Breadcrumbs, Grid, Typography, Link, Rating, Divider, Fab } from "@mui/material";

import StarIcon from '@mui/icons-material/Star';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from "react";
export default function FeedBack() {
    const [showFeedbackCount, setShowFeedbackCount] = useState(1);
    const feedbackItems = ['Feedback 1', 'Feedback 2', /* all feedback items here... */];

    // Handler for the 'Show More' button click
    const handleShowMoreClick = () => {
        setShowFeedbackCount(prevCount => prevCount + 5); // Show 5 more items
    };

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
            {feedbackItems.slice(0, showFeedbackCount).map((feedback, index) => (
                <div>
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

                    </Grid>
                    <Divider sx={{ my: 2, border: '1px solid #FFFF' }} />
                </div>
            ))}
            {showFeedbackCount < feedbackItems.length && (
                <Box sx={{ m: 2 }}>
                    <Fab variant="extended" size="medium" color="primary">
                        <ArrowDownwardIcon sx={{ mr: 1 }} />
                        Show more
                    </Fab>
                </Box>
            )}

        </>
    );
}