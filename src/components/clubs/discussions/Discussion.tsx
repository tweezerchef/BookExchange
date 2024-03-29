import { Card, CardContent, Typography } from "@mui/material";
import { CommentInput } from "./CommentInput";
import { CommentSection } from "./CommentSection";

export function Discussion({ discussion, posts }) {
  // discussion and comments are passed as props
  const submitComment = (comment) => {
    console.log(comment); // add comment to comments array
  };
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{discussion.title}</Typography>
        <Typography variant='body1'>{discussion.body}</Typography>
        {/* Additional discussion details like image, thumbs up/down can be added here */}

        <CommentInput onSubmit={submitComment} />
        <CommentSection comments={posts} />
      </CardContent>
    </Card>
  );
}
