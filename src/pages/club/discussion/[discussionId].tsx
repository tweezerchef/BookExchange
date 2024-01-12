import { Grid } from "@mui/material";
import { Discussion } from "../../../components/clubs/discussions/Discussion";
import { useRouter } from "next/router";

function DiscussionsList({ discussions }) {
  const router = useRouter();
  const { discussionId } = router.query;
  return (
    <Grid container spacing={2}>
      {discussions.map((discussion) => (
        <Grid item xs={12} key={discussion.id}>
          <Discussion discussion={discussion} posts={discussion.Posts} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DiscussionsList;
