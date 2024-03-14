import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import PlaceForm from '../../components/PlaceForm';
import MenuForm from '../../components/MenuForm';
import DecorationForm from '../../components/DecorationForm';
import ReviewOrder from '../../components/ReviewOrder';

const steps = ['Choose Your Place', 'Choose Your Menu', 'Choose Your Decoration'];

function ShowStep({ step }: StepContentProps) {
    switch (step) {
        case 0:
            return <PlaceForm />;
        case 1:
            return <MenuForm />;
        case 2:
            return <DecorationForm />;
        case 3:
            return <ReviewOrder />;
        default:
            return <div>Not Found</div>;
    }
}

interface StepContentProps {
    step: number;
}

export default function BookingPage() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // Optionally, you can add handleBack if you want a "Back" button
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <ShowStep step={activeStep} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {/* Optional Back Button */}
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                {/* Spacer to push the Next button to the right */}
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
}