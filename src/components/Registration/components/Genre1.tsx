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
  mystery: boolean;
  fantasy: boolean;
  historicalFiction: boolean;
  western: boolean;
  nonFiction: boolean;
  fiction: boolean;
  childrens: boolean;
  cooking: boolean;
  selfHelp: boolean;
  travel: boolean;
  spirituality: boolean;
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
    <FormControlLabel
      control={
        <Checkbox
          checked={state.mystery}
          onChange={handleChange}
          name='mystery'
        />
      }
      label='Mystery'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.selfHelp}
          onChange={handleChange}
          name='selfHelp'
        />
      }
      label='Self-Help'
    />
  </FormGroup>
);
