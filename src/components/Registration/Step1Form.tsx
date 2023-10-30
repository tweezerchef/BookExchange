import Button from "@mui/material/Button";
import { useFormData } from "../../context/regContext";
import { UserAddress } from "./components/UserAddress";
import { UserName } from "./components/UserName";
import { GenrePicker } from "./components/GenrePicker";
import AviAdd from "./components/AviAdd";
import { useUserState } from "../../context/context";

interface Step1FormProps {
  handleNext: () => void;
}

export const Step1Form: React.FC<Step1FormProps> = ({ handleNext }) => {
  const { formData, updateFormData } = useFormData();
  const state = useUserState();
  const { user } = state;
  console.log("user:", user);
  console.log("formData:", formData);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    try {
      const form = new FormData();
      form.append("address", formData.address);
      form.append("userName", formData.userName);
      form.append("avatarUrl", formData.avatarUrl);

      if (formData.aviFileData) {
        form.append("aviFile", formData.aviFileData);
      }

      const response = await fetch("api/user/info/updateStep1", {
        method: "POST",
        body: form,
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
  );
};
