import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function DiscussionCard({ title, body, image }) {
  return (
    <Card>
      {image && <CardMedia component='img' image={image} alt={title} />}
      <CardContent>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='body2'>{body}</Typography>
      </CardContent>
    </Card>
  );
}
