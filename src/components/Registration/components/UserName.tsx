import TextField from "@mui/material/TextField";
import { useFormData } from "../../../context/regContext";

export const UserName: React.FC = () => {
  const { formData, updateFormData } = useFormData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <TextField
      label=' Create A User Name'
      name='userName'
      value={formData.userName || ""} // fallback to an empty string if formData.userName is undefined
      onChange={handleChange}
      required
    />
  );
};
