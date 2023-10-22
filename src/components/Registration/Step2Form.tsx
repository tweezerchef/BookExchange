import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Step2FormProps {
  handleNext: () => void;
  handleBack: () => void;
}

const Step2Form: React.FC<Step2FormProps> = ({ handleNext, handleBack }) => {
  const [formData, setFormData] = useState({
    adGroupName: "",
    keywords: "",
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
        label='Ad Group Name'
        name='adGroupName'
        value={formData.adGroupName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label='Keywords'
        name='keywords'
        value={formData.keywords}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button onClick={handleBack} variant='contained'>
        Back
      </Button>
      <Button type='submit' variant='contained' color='primary'>
        Next
      </Button>
    </form>
  );
};

export default Step2Form;
