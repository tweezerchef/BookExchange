import { Grid } from "@mui/material";
import { Discussion } from "../components/clubs/discussions/Discussion";

function DiscussionsList({ discussions }) {
  // discussions is an array of discussion objects
  return (
    <Grid container spacing={2}>
      {discussions.map((discussion) => (
        <Grid item xs={12} key={discussion.id}>
          <Discussion discussion={discussion} comments={discussion.Posts} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DiscussionsList;
