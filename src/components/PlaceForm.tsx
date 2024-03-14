import { useEffect, useState } from "react";
import Agent from "../utils/agent";
import { Service } from "../Models/Service";
import { Card, CardContent, FormGroup, Grid, Typography } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PlaceForm() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        Agent.getService()
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <>
            <Grid>
                <Grid container className="mt-6">
                    <Grid item xs={12} className='flex justify-between items-center'>
                        <Typography variant='h4' sx={{ ml: 1.25 }}>Choose your place</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            {
                                services.map((service) => (
                                    <FormControlLabel
                                        key={service.id} // assuming each service has a unique 'id'
                                        label={ // this will become the text part of the label
                                            <Card sx={{ display: 'flex', background: 'black', color: 'white' }}>
                                                <Grid container alignItems="center"> {/* use container for root Grid */}
                                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                                        <Typography component="div" variant="h5">
                                                            {service.name}
                                                        </Typography>
                                                        <Typography component="div" variant="subtitle1">
                                                            {service.price}
                                                        </Typography>
                                                        <Typography variant="subtitle1" component="div">
                                                            {service.description}
                                                        </Typography>
                                                    </CardContent>
                                                </Grid>
                                            </Card>
                                        }
                                        control={<Checkbox sx={{
                                            color: 'white',
                                            '&.Mui-checked': {
                                                color: 'white',
                                            },
                                        }} />} // this is the checkbox element itself
                                    />
                                ))
                            }
                        </FormGroup>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
