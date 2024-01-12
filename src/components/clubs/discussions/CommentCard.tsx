import { ListItem, Typography } from "@mui/material";
import { NestedComment } from "./NestedComment";

export function CommentCard({ post, replies }) {
  return (
    <ListItem>
      <Typography variant='body1'>{post}</Typography>
      {replies &&
        replies.map((reply) => <NestedComment key={reply.id} {...reply} />)}
    </ListItem>
  );
}
