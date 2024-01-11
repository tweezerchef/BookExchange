import { ListItem, Typography } from "@mui/material";

export function NestedComment({ post }) {
  return (
    <ListItem sx={{ pl: 4 }}>
      {" "}
      {/* Indentation for nested replies */}
      <Typography variant='body2'>{post}</Typography>
    </ListItem>
  );
}
