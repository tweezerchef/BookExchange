import { useState, useEffect } from "react";
import Image from "next/image";
import { Step1Form } from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import Step3Form from "../components/Registration/Step3Form";
import { RegisterBox, CenteredContainer } from "./pageStyles/pageStyles";
import { FormProvider } from "../context/regContext";

const fileName =
  "DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png";

const Registration = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );

  // In your Registration component
  useEffect(() => {
    fetch(`/api/AWS/signedURL?fileName=${fileName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: { url: string }) => {
        const { url } = data;
        setBackgroundImageUrl(url);
      })
      .catch(console.error); // Log errors to the console
  }, []);

  const forms = [
    <Step1Form key='step1' handleNext={() => setActiveStep(1)} />,
    <Step2Form
      key='step2'
      handleNext={() => setActiveStep(2)}
      handleBack={() => setActiveStep(0)}
    />,
    <Step3Form key='step3' handleBack={() => setActiveStep(1)} />,
  ];

  return (
    <FormProvider>
      <CenteredContainer maxWidth='sm'>
        <RegisterBox>
          {backgroundImageUrl && (
            <Image
              src={backgroundImageUrl}
              alt='Background'
              fill
              sizes='(max-width: 600px) 100vw, (max-width: 800px) 50vw, 750px'
              quality={100}
              priority
              style={{ zIndex: -1 }}
            />
          )}
          {forms[activeStep]}
        </RegisterBox>
      </CenteredContainer>
    </FormProvider>
  );
};

export default Registration;
