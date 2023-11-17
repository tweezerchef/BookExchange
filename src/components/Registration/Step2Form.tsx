import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { Books } from "@prisma/client";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import ExploreBooksBox from "../Carousels/ExploreBooksBox";
import { ExploreFriendsBox } from "../Carousels/ExploreFriendsBox";
import { IntroStep1 } from "./components/IntroStep1";
import { IntroStep2 } from "./components/IntroStep2";

interface UserCookie {
  id: string;
  email: string;
  username: string;
}

interface Step2FormProps {
  handleBack: () => void;
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  user: UserCookie;
}

const Step2Form: React.FC<Step2FormProps> = ({
  handleBack,
  books,
  setBooks,
  user,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [ratedBookCount, setRatedBookCount] = useState(0);
  const router = useRouter();

  const handleRatingChange = () => {
    setRatedBookCount((prevCount) => prevCount + 1);
    console.log("poop", ratedBookCount);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1); // Go to next step
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Go to previous step
    } else {
      handleBack(); // If it's the first step, handle back action
    }
  };

  const handleSubmit = () => {
    void router.push("/login");
  };
  const isRegistration = true;

  return (
    <>
      {currentStep === 1 && <IntroStep1 setStep2={() => setCurrentStep(2)} />}
      {currentStep === 2 && <IntroStep2 setStep2={() => setCurrentStep(3)} />}
      {/* Add more steps here as needed */}
      <Box width='100%'>
        {currentStep === 2 ||
          (3 && (
            <>
              <Box>
                <Typography variant='body1'>
                  {`Books rated: ${ratedBookCount}/10`}
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={(ratedBookCount / 10) * 100}
                />
              </Box>
              <ExploreBooksBox
                books={books}
                setBooks={setBooks}
                {...(user ? { user } : {})}
                isRegistration={isRegistration}
                onRatingChange={handleRatingChange}
              />
            </>
          ))}
        {currentStep === 4 && <ExploreFriendsBox {...(user ? { user } : {})} />}
        <Button
          onClick={handlePrev}
          variant='contained'
          disabled={ratedBookCount < 10}
        >
          Back
        </Button>
        {currentStep < 4 ? (
          <Button onClick={handleNext} variant='contained' color='primary'>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Let's Go!
          </Button>
        )}
      </Box>
    </>
  );
};

export default Step2Form;
