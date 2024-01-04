import { FC } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface ClubNamePickerProps {
  clubName: string;
  setClubName: React.Dispatch<React.SetStateAction<string>>;
  clubDescription: string;
  setClubDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const ClubNamePicker: FC<ClubNamePickerProps> = ({
  clubName,
  setClubName,
  clubDescription,
  setClubDescription,
}) => (
  <Stack>
    <TextField
      id='outlined-basic'
      label='Club Name'
      variant='outlined'
      value={clubName}
      onChange={(e) => setClubName(e.target.value)}
    />
    <TextField
      id='outlined-basic'
      label='Club Description'
      variant='outlined'
      value={clubDescription}
      onChange={(e) => setClubDescription(e.target.value)}
    />
  </Stack>
);
