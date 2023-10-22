import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Step1Form from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import Step3Form from "../components/Registration/Step3Form";

const steps = [
  "Step 1: Select campaign settings",
  "Step 2: Create an ad group",
  "Step 3: Create an ad",
];

const Registration = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {index === 0 && <Step1Form handleNext={handleNext} />}
              {index === 1 && (
                <Step2Form handleNext={handleNext} handleBack={handleBack} />
              )}
              {index === 2 && <Step3Form handleBack={handleBack} />}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Registration;
