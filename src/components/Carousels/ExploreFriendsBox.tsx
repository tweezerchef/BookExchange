import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { User } from "@prisma/client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const theme = useTheme();
  const breakpoints: Breakpoint = [
    { width: 900, itemsPerPage: 4 },
    { width: 650, itemsPerPage: 3 },
    { width: 300, itemsPerPage: 2 },
    { width: 320, itemsPerPage: 1 },
    { width: 0, itemsPerPage: 1 },
  ];
  const { itemsPerPage: containerItemsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  const isViewportUnder700 = useMediaQuery("(max-width:700px)");
  const isViewportUnder500 = useMediaQuery("(max-width:500px)");

  let friendsPerPage: number;
  if (isViewportUnder500) {
    friendsPerPage = 1;
  } else if (isViewportUnder700) {
    friendsPerPage = 1;
  } else {
    friendsPerPage = containerItemsPerPage;
  }

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
