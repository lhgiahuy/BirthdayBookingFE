import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import PlaceForm from "../../components/PlaceForm";
import ServiceForm from "../../components/MenuForm";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getMenuPrice, getTotalPrice } from "../../redux/slice/orderSlice";
import ReviewOrder from "../../components/ReviewOrder";
import { useEffect, useState } from "react";
import { OrderModel } from "../../Models/Order";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      return <ReviewOrder />;
  }
}

interface StepContentProps {
  step: number;
}

export default function BookingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.orderSlice);
  const { id } = useAppSelector((state) => state.serviceState);
  const customerId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (activeStep > 3) {
      const fetchData = async (order: OrderModel) => {
        try {
          const response = await axios.post(
            "https://swdbirthdaypartybooking.somee.com/api/booking",
            JSON.stringify(order),
            {
              headers: {
                accept: "*/*",
                "Content-Type": "application/json-patch+json",
              },
            }
          );
          console.log("Response:", response.data);
          navigate("/OrderHistory");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const mappedService = order.selectedServices.map((value: any) => ({
        id: value.serviceId,
        quantity: value.quantity,
      }));

      const mappedOrder = {
        hostId: id,
        guestId: customerId,
        placeId: order.place.id,
        serviceRequests: mappedService,
        totalPrice: order.totalPrice,
        date: order.date,
        note: order.note,
      };

      console.log(JSON.stringify(mappedOrder));

      fetchData(mappedOrder);
      window.scrollTo(0, 0); // Scroll to top of the page
    }
  }, [order, activeStep, id, customerId]);

  const HandleNext = () => {
    dispatch(getTotalPrice());
    dispatch(getMenuPrice());
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);

    // Scroll to top of the page
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
        <Button variant="contained" color="primary" onClick={HandleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
