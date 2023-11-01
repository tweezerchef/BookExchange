import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  OuterBox,
  LeftIconButton,
  BookBox,
  RightIconButton,
} from "./styles/exploreBooksStyle";
import { ProfileCard } from "../users/ProfileCard";

type Friend = User;

export const ExploreFriends: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [randomFriends, setRandomFriends] = useState<Friend[]>([]);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "left"
  );
  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const friendsPerPage = 4;

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
    <OuterBox>
      <LeftIconButton onClick={handlePrevPage} disabled={currentPage === 0}>
        <NavigateBeforeIcon />
      </LeftIconButton>
      {randomFriends.map((friend, index) => (
        <BookBox
          key={friend.id}
          sx={{
            display: currentPage === index ? "block" : "none",
          }}
        >
          <Slide direction={slideDirection} in={currentPage === index}>
            <Stack
              spacing={2}
              direction='row'
              maxWidth='100%'
              maxHeight='100%'
              alignContent='center'
              justifyContent='center'
            >
              {randomFriends
                .slice(
                  index * friendsPerPage,
                  index * friendsPerPage + friendsPerPage
                )
                .map((friendItem: Friend) => (
                  <Box key={friendItem.id}>
                    <ProfileCard friend={friendItem} />
                  </Box>
                ))}
            </Stack>
          </Slide>
        </BookBox>
      ))}
      <RightIconButton
        onClick={handleNextPage}
        disabled={
          currentPage >=
          Math.ceil((randomFriends.length || 0) / friendsPerPage) - 1
        }
      >
        <NavigateNextIcon />
      </RightIconButton>
    </OuterBox>
  );
};
