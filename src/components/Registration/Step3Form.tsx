import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import exp from "constants";

interface Step3FormProps {
  handleBack: () => void;
}

const Step3Form: React.FC<Step3FormProps> = ({ handleBack }) => (
  <div>
    <Typography variant='h6'>Step 3: Create an ad</Typography>
    {/* Add your ad creation form here */}
    <Button onClick={handleBack} variant='contained'>
      Back
    </Button>
    <Button variant='contained' color='primary'>
      Finish
    </Button>
  </div>
);

export default Step3Form;
