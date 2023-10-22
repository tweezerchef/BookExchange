/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Step1Form from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import Step3Form from "../components/Registration/Step3Form";
import { BackgroundBox, CenteredContainer } from "./pageStyles/pageStyles";

const Registration = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const forms = [
    <Step1Form handleNext={() => setActiveStep(1)} />,
    <Step2Form
      handleNext={() => setActiveStep(2)}
      handleBack={() => setActiveStep(0)}
    />,
    <Step3Form handleBack={() => setActiveStep(1)} />,
  ];

  return (
    <CenteredContainer maxWidth='sm'>
      <BackgroundBox>{forms[activeStep]}</BackgroundBox>
    </CenteredContainer>
  );
};

export default Registration;
