import Button from "@mui/material/Button";
import { useFormData } from "../../context/regContext";
import { UserAddress } from "./components/UserAddress";
import { UserName } from "./components/UserName";
import { GenrePicker } from "./components/GenrePicker";
import AviAdd from "./components/AviAdd";

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
    handleNext();
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
