import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { ExploreFriends } from "./ExploreFriends";

export const ExploreFriendsBox: React.FC = () => (
  <Box>
    <Divider textAlign='left'>
      <Chip label='Make Some Friends' />
    </Divider>
    <ExploreFriends />
  </Box>
);
