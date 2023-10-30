import { useState, useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Step1Form } from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import Step3Form from "../components/Registration/Step3Form";
import {
  RegisterBox,
  CenteredContainer,
} from "../styles/pageStyles/pageStyles";
import { FormProvider } from "../context/regContext";

const fileName =
  "DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png";
const libraryCardFile = "NOBELibraryCard.png";

const Registration = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );
  const [libraryCardImageUrl, setLibraryCardImageUrl] = useState<string>(
    "" || null
  );

  useEffect(() => {
    const fileNames = [fileName, libraryCardFile].join(",");
    fetch(`/api/AWS/signedURL?fileNames=${fileNames}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if ("urls" in data) {
          if (data.urls.length >= 2) {
            setBackgroundImageUrl(data.urls[0]);
            setLibraryCardImageUrl(data.urls[1]);
          } else {
            console.error("Not enough URLs in response");
          }
        } else if ("url" in data) {
          console.log("Received a single URL:", data.url);
        } else if ("message" in data) {
          // data is of type ErrorMessage
          console.error("Error:", data.message);
        }
      })
      .catch(console.error);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "start",
              mt: "0",
              width: "400px",
              filter: "brightness(1.2) contrast(1.2)",
            }}
          >
            {libraryCardImageUrl && (
              <Image
                src={libraryCardImageUrl}
                alt='logo'
                width={400} // You need to provide a width
                height={220} // You need to provide a height, adjust this based on your image's aspect ratio
                quality={100}
              />
            )}
          </Box>

          {forms[activeStep]}
        </RegisterBox>
      </CenteredContainer>
    </FormProvider>
  );
};

export default Registration;
