import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { User } from "@prisma/client";
import { ExploreFriends } from "./ExploreFriends";
import { useContainerQuery } from "./hooks/useContainerQuery";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

type Friend = User;
type CombinedDataResponse = {
  randomFriendsRes: Friend[];
  friendIdsRes: string[];
};

export const ExploreFriendsBox: React.FC = () => {
  const [randomFriends, setRandomFriends] = useState<Friend[]>([]);
  const [friendIds, setFriendIds] = useState<string[]>([]);
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
  useEffect(() => {
    fetch("/api/friend/combinedData")
      .then((res) => res.json() as Promise<CombinedDataResponse>)
      .then(({ randomFriendsRes, friendIdsRes }) => {
        setRandomFriends(randomFriendsRes);
        setFriendIds(friendIdsRes);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box ref={containerRef} width='100%'>
      <Divider textAlign='left'>
        <Chip label='Make Some Friends' />
      </Divider>
      <ExploreFriends
        friendsPerPage={friendsPerPage}
        randomFriends={randomFriends}
        friendIds={friendIds}
      />
    </Box>
  );
};
