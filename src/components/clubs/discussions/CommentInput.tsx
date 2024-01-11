import { TextField, Button } from "@mui/material";

export function CommentInput({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <TextField fullWidth placeholder='Add a comment...' />
      <Button type='submit'>Post</Button>
    </form>
  );
}
