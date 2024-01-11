import { List } from "@mui/material";
import { CommentCard } from "./CommentCard";

export function CommentSection({ comments }) {
  return (
    <List>
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </List>
  );
}
