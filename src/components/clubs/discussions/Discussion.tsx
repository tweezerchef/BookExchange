import { Card, CardContent, Typography } from "@mui/material";
import { CommentInput } from "./CommentInput";
import { CommentSection } from "./CommentSection";

export function Discussion({ discussion, comments }) {
  // discussion and comments are passed as props

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{discussion.title}</Typography>
        <Typography variant='body1'>{discussion.body}</Typography>
        {/* Additional discussion details like image, thumbs up/down can be added here */}

        <CommentInput onSubmit={} />
        <CommentSection comments={comments} />
      </CardContent>
    </Card>
  );
}
