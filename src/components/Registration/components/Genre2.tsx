import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FC } from "react";

interface GenreState {
  action: boolean;
  comedy: boolean;
  drama: boolean;
  horror: boolean;
  romance: boolean;
  thriller: boolean;
  sciFI: boolean;
}

interface Genre1Props {
  state: GenreState;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Genre2: FC<Genre1Props> = ({ state, handleChange }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox
          checked={state.horror}
          onChange={handleChange}
          name='horror'
        />
      }
      label='Horror'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.romance}
          onChange={handleChange}
          name='romance'
        />
      }
      label='Romance'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.thriller}
          onChange={handleChange}
          name='thriller'
        />
      }
      label='Thriller'
    />
  </FormGroup>
);
