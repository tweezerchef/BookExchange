import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { FC, useState } from "react";

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

export const Genre1: FC<Genre1Props> = ({ state, handleChange }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox
          checked={state.action}
          onChange={handleChange}
          name='action'
        />
      }
      label='Action'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.comedy}
          onChange={handleChange}
          name='comedy'
        />
      }
      label='Comedy'
    />
    <FormControlLabel
      control={
        <Checkbox checked={state.sciFI} onChange={handleChange} name='scgFI' />
      }
      label='Science Fiction'
    />
    <FormControlLabel
      control={
        <Checkbox checked={state.drama} onChange={handleChange} name='drama' />
      }
      label='Drama'
    />
  </FormGroup>
);
