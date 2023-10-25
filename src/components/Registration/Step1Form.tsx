import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormData } from "../../context/regContext";
import { UserAddress } from "./components/UserAddress";
import UserName from "./components/UserName";

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
