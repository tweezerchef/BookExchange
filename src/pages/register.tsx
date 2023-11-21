import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Books } from "@prisma/client";
import { Step1Form } from "../components/Registration/Step1Form";
import Step2Form from "../components/Registration/Step2Form";
import {
  RegisterBox,
  CenteredContainer,
  BackgroundImageContainer,
} from "../styles/pageStyles/pageStyles";
import { FormProvider } from "../context/regContext";
import { ApiResponse } from "../types/global";

const fileName = "loginBackground.png";

interface UserCookie {
  id: string;
  email: string;
  username: string;
}
interface ValidateResponse {
  user: UserCookie;
}

const Registration = (props) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [books, setBooks] = useState<Books[]>([]);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );
  const [user, setUser] = useState<UserCookie | null>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("/api/auth/validateCookie");
      if (!response.ok) {
        // Handle the case where the user is not authenticated
        void router.push("/login");
        return;
      }

      const data: ValidateResponse =
        (await response.json()) as ValidateResponse;
      // Now you have the user info and can handle it as needed
      setUser(data.user);
    };

    void fetchUserInfo();
  }, [router]);
  useEffect(() => {
    fetch(`/api/AWS/signedURL?fileNames=${fileName}`, {
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
          setBackgroundImageUrl(data.url);
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
      user={user}
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
