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
  const fetchRandomFriends = () =>
    fetch("/api/friend/randomFriends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

  const fetchFriendIds = () =>
    fetch("/api/friend/friendIds", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

  useEffect(() => {
    fetch("/api/friend/randomFriends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => res.json())
      .then((data: Friend[]) => {
        setRandomFriends(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Box ref={containerRef} width='100%'>
      <Divider textAlign='left'>
        <Chip label='Make Some Friends' />
      </Divider>
      <ExploreFriends friendsPerPage={friendsPerPage} />
    </Box>
  );
};
