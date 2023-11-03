import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useRef } from "react";
import { ExploreFriends } from "./ExploreFriends";
import { useContainerQuery } from "./hooks/useContainerQuery";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];
export const ExploreFriendsBox: React.FC = () => {
  const containerRef = useRef(null);
  const breakpoints: Breakpoint = [
    { width: 1000, itemsPerPage: 4 },
    { width: 600, itemsPerPage: 3 },
    { width: 300, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 1 },
  ];
  const { itemsPerPage: friendsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  return (
    <Box ref={containerRef} width='100%'>
      <Divider textAlign='left'>
        <Chip label='Make Some Friends' />
      </Divider>
      <ExploreFriends friendsPerPage={friendsPerPage} />
    </Box>
  );
};
