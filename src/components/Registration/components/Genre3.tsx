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
interface Genre3Props {
  state: GenreState;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Genre3: FC<Genre3Props> = ({ state, handleChange }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox
          checked={state.historicalFiction}
          onChange={handleChange}
          name='historicalFiction'
        />
      }
      label='Historical Fiction'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.western}
          onChange={handleChange}
          name='western'
        />
      }
      label='Western'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.nonFiction}
          onChange={handleChange}
          name='nonFiction'
        />
      }
      label='Non-Fiction'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.cooking}
          onChange={handleChange}
          name='cooking'
        />
      }
      label='Cooking'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.nonFiction}
          onChange={handleChange}
          name='nonFiction'
        />
      }
      label='Non-Fiction'
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={state.childrens}
          onChange={handleChange}
          name='childrens'
        />
      }
      label="Children's"
    />
  </FormGroup>
);
