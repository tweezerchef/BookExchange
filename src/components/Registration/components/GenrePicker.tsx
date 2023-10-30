import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { FC, useState } from "react";
import { Genre1 } from "./Genre1";
import { Genre2 } from "./Genre2";
import { useFormData } from "../../../context/regContext";

export const GenrePicker: FC = () => {
  const [state, setState] = useState({
    action: false,
    comedy: false,
    drama: false,
    horror: false,
    romance: false,
    thriller: false,
    sciFI: false,
  });
  const { formData, updateFormData } = useFormData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setState({ ...state, [name]: checked });
    updateFormData({
      genres: {
        ...formData.genres,
        [name]: checked,
      },
    });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Card
        sx={{
          backgroundColor: "transparent",
          ":hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
          padding: 2,
          borderRadius: 2,
        }}
      >
        <FormControl component='fieldset' sx={{ m: 3 }}>
          <FormLabel component='legend'>
            Select your favorite book genres:
          </FormLabel>
          <Stack direction='row' spacing={3}>
            <Genre1 state={state} handleChange={handleChange} />
            <Genre2 state={state} handleChange={handleChange} />
          </Stack>
          <FormHelperText>Select at least one genre</FormHelperText>
        </FormControl>
      </Card>
    </Box>
  );
};
