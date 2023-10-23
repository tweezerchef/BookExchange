import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserAddress from "./UserAddress";

interface Step1FormProps {
  handleNext: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    campaignName: "",
    budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    handleNext(); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Campaign Name'
        name='campaignName'
        value={formData.campaignName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label='Budget'
        name='budget'
        type='number'
        value={formData.budget}
        onChange={handleChange}
        fullWidth
        required
      />
      <UserAddress />
      <Button type='submit' variant='contained' color='primary'>
        Next
      </Button>
    </form>
  );
};

export default Step1Form;
