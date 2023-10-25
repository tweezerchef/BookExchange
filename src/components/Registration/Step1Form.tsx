import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useFormData } from "../../context/regContext";
import { UserAddress } from "./components/UserAddress";
import { UserName } from "./components/UserName";

interface Step1FormProps {
  handleNext: () => void;
}

export const Step1Form: React.FC<Step1FormProps> = ({ handleNext }) => {
  const { formData, updateFormData } = useFormData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData", formData);
    handleNext(); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserName />
      <UserAddress />
      <Button type='submit' variant='contained' color='primary'>
        Next
      </Button>
    </form>
  );
};
