import { Box, Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function Footer() {
    return (
        <>
            <Box sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "white",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}>
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Typography color="black" variant="h5">
                                EZENT
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="textSecondary" variant="subtitle1">
                                {`${new Date().getFullYear()} | EZENT | SWD392 | SPRING`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
