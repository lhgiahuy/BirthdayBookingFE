import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import PlaceForm from "../../components/PlaceForm";
import MenuForm from "../../components/MenuForm";
import DecorationForm from "../../components/DecorationForm";
import ReviewOrder from "../../components/ReviewOrder";
import ServiceForm from "../../components/MenuForm";
import { useAppDispatch } from "../../redux/hook";
import { getMenuPrice, getTotalPrice } from "../../redux/slice/orderSlice";

const steps = [
  "Choose Your Place",
  "Choose Your Menu",
  "Choose Your Decoration",
  "Review Your Order",
];

function ShowStep({ step }: StepContentProps) {
  switch (step) {
    case 0:
      return <PlaceForm />;
    case 1:
      return <ServiceForm title="CHOOSE YOUR MENU" type="dish" />;
    case 2:
      return <ServiceForm title="CHOOSE YOUR DECORATION" type="decoration" />;
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
  const dispatch = useAppDispatch();
  const handleNext = () => {
    dispatch(getTotalPrice());
    dispatch(getMenuPrice());
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Optionally, you can add handleBack if you want a "Back" button
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step
            sx={{
              color: "white", // Màu mặc định
              "&.Mui-active": { color: "white" }, // Khi step đang active
              "&.Mui-completed": { color: "white" }, // Khi step đã hoàn thành
              "& .MuiStepLabel-label": {
                // Override styles for the label text
                color: "white", // For the default state
                "&.Mui-active": { color: "white" }, // Khi label đang active
                "&.Mui-completed": { color: "white" }, // Khi label đã hoàn thành
                "&.Mui-disabled": { color: "white" }, // Khi label bị disable
              },
            }}
            key={label}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <ShowStep step={activeStep} />
      <Box sx={{ display: "flex", flexDirection: "row", pt: 8 }}>
        {/* Optional Back Button */}
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          variant="outlined"
        >
          Back
        </Button>
        {/* Spacer to push the Next button to the right */}
        <Box sx={{ flex: "1 1 auto" }} />
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
