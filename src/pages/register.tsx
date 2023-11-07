import { useState, useEffect } from "react";
import Image from "next/image";
import { Books } from "@prisma/client";
import { Step1Form } from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import Step3Form from "../components/Registration/Step3Form";
import {
  RegisterBox,
  CenteredContainer,
  BackgroundImageContainer,
} from "../styles/pageStyles/pageStyles";
import { FormProvider } from "../context/regContext";
import { ApiResponse } from "../types/global";

const fileName = "loginBackground.png";
const libraryCardFile = "NOBELibraryCard.png";

const Registration = (props) => {
  const [activeStep, setActiveStep] = useState(1);
  const [books, setBooks] = useState<Books[]>([]);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
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
      .then((data: Response | ApiResponse) => {
        if (
          "urls" in data &&
          Array.isArray(data.urls) &&
          data.urls.length === 2
        ) {
          if (data.urls.length >= 2) {
            setBackgroundImageUrl(data.urls[0]);
          } else {
            console.error("Not enough URLs in response");
          }
        } else if ("url" in data) {
          console.log("Received a single URL:", data.url);
        } else if ("message" in data && data.message) {
          // data is of type ErrorMessage
          console.error("Error:", data.message);
        }
      })
      .catch(console.error);
    fetch(`/api/bookDB/randomBooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Books[] | Response) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else if ("message" in data && data.message) {
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
      books={books}
      setBooks={setBooks}
      handleBack={() => setActiveStep(0)}
    />,
  ];

  return (
    <FormProvider>
      <CenteredContainer>
        <RegisterBox>
          {backgroundImageUrl && (
            <BackgroundImageContainer>
              <Image
                src={backgroundImageUrl}
                alt='Background'
                fill
                quality={80}
                priority
                sizes='(max-width: 1200px)'
              />
            </BackgroundImageContainer>
          )}
          {forms[activeStep]}
        </RegisterBox>
      </CenteredContainer>
    </FormProvider>
  );
};

export default Registration;
