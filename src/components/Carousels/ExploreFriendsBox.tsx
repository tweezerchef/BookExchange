import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { User } from "@prisma/client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ExploreFriends } from "./ExploreFriends";
import { useContainerQuery } from "./hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

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
    { width: 320, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 2 },
  ];
  const { itemsPerPage: containerItemsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  const isViewportUnder450 = useMediaQuery("(max-width:450px)");

  let friendsPerPage: number;
  if (isViewportUnder450) {
    friendsPerPage = 5;
  } else {
    friendsPerPage = containerItemsPerPage;
  }
  const isMobile = useMediaQuery(theme.breakpoints.down(450));
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
    <ExploreBooksBoxWrapper isMobile={isMobile} ref={containerRef}>
      <Divider textAlign='left'>
        <Chip label='Make Some Friends' />
      </Divider>
      <ExploreFriends
        friendsPerPage={friendsPerPage}
        randomFriends={randomFriends}
        friendIds={friendIds}
      />
    </ExploreBooksBoxWrapper>
  );
};
