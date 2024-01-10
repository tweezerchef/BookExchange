import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useEffect, useRef, useState, FC } from "react";
import { User } from "@prisma/client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ExploreFriends } from "./ExploreFriends";
import { FriendsBoxWrapper } from "./styles/friendsStyle";

interface ExploreFriendsBoxProps {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

type Friend = User;
type CombinedDataResponse = {
  randomFriendsRes: Friend[];
  friendIdsRes: string[];
};

export const ExploreFriendsBox: FC<ExploreFriendsBoxProps> = ({
  user = null,
}) => {
  const [randomFriends, setRandomFriends] = useState<Friend[]>([]);
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width:460px)");
  let booksPerPage = 1;

  const isMedium = useMediaQuery("(min-width:650px)");
  const isLarge = useMediaQuery("(min-width:800px)");
  const isExtraLarge = useMediaQuery("(min-width:1100px)");

  if (isExtraLarge) {
    booksPerPage = 4;
  } else if (isLarge) {
    booksPerPage = 3;
  } else if (isMedium) {
    booksPerPage = 2;
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
    <FriendsBoxWrapper isMobile={isMobile}>
      <Divider textAlign='left'>
        <Chip label='Make Some Friends' />
      </Divider>
      {user ? (
        <ExploreFriends
          friendsPerPage={booksPerPage}
          randomFriends={randomFriends}
          friendIds={friendIds}
          isMobile={isMobile}
          user={user}
        />
      ) : (
        <ExploreFriends
          friendsPerPage={booksPerPage}
          randomFriends={randomFriends}
          friendIds={friendIds}
          isMobile={isMobile}
        />
      )}
    </FriendsBoxWrapper>
  );
};
