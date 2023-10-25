import { useState, useEffect } from "react";
import Image from "next/image";
import { getSignedURL } from "../utils/getSignedURL";
import { Step1Form } from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import Step3Form from "../components/Registration/Step3Form";
import { RegisterBox, CenteredContainer } from "./pageStyles/pageStyles";
import { FormProvider } from "../context/regContext";

const Registration = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );

  useEffect(() => {
    // Assume getSignedUrl is a function that fetches a signed URL from your server
    getSignedURL(
      "DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png"
    )
      .then(setBackgroundImageUrl)
      .catch(console.error); // Log errors to the console
  }, []);

  const forms = [
    <Step1Form handleNext={() => setActiveStep(1)} />,
    <Step2Form
      handleNext={() => setActiveStep(2)}
      handleBack={() => setActiveStep(0)}
    />,
    <Step3Form handleBack={() => setActiveStep(1)} />,
  ];

  return (
    <FormProvider>
      <CenteredContainer maxWidth='sm'>
        <RegisterBox>
          {backgroundImageUrl && (
            <Image
              src={backgroundImageUrl}
              alt='Background'
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          )}
          {forms[activeStep]}
        </RegisterBox>
      </CenteredContainer>
    </FormProvider>
  );
};

export default Registration;
