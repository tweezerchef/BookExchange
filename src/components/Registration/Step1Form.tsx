import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormData } from "../../context/regContext";
import { UserAddress } from "./components/UserAddress";
import { UserName } from "./components/UserName";
import { GenrePicker } from "./components/GenrePicker";
import AviAdd from "./components/AviAdd";
import { useHomeState } from "../../context/context";

interface Step1FormProps {
  handleNext: () => void;
}

export const Step1Form: React.FC<Step1FormProps> = ({ handleNext }) => {
  const { formData, aviFileData } = useFormData();

  const state = useHomeState();

  const { user } = state;
  const userId = user?.id;

  const submitForm = async () => {
    try {
      const data = {
        formData,
        userId,
      };
      const response = await fetch("/api/user/info/updateStep1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success
        console.log("Form submitted successfully");
        handleNext();
      } else {
        // Handle error
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm().catch((error) =>
      console.error("Form submission failed", error)
    );
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <AviAdd />
        <UserName />
        <UserAddress />
        <GenrePicker />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ margin: 3 }}
        >
          Next
        </Button>
      </form>
    </Box>
  );
};
