import { Grid } from "@mui/material";
import { Discussion } from "../../../components/clubs/discussions/Discussion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function DiscussionsList(props) {
  const [discussion, setDiscussion] = useState(null);
  const router = useRouter();
  const { discussionId } = router.query;

  useEffect(() => {
    const fetchDiscussion = async () => {
      if (discussionId) {
        try {
          const res = await fetch(
            `/api/clubs/getDiscussion?discussionId=${discussionId}`
          );
          const body = await res.json();
          console.log(body);
          setDiscussion(body);
        } catch (error) {
          console.error("Failed to fetch discussion data", error);
        }
      }
    };
    fetchDiscussion();
  }, [discussionId]);

  return (
    <Grid container spacing={2}>
      <Discussion discussion={discussion} posts={discussion.Posts} />
    </Grid>
  );
}

export default DiscussionsList;
