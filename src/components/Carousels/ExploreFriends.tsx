/* eslint-disable react/require-default-props */
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { User } from "@prisma/client";
import { useEffect, useState, FC } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  LeftIconButton,
  BookBox,
  RightIconButton,
  OuterWrapperBox,
  MobileBox,
} from "./styles/exploreBooksStyle";
import { ProfileCard } from "../users/ProfileCard";

type Friend = User;

interface ExploreFriendsProps {
  friendsPerPage: number;
  randomFriends: Friend[];
  friendIds: string[];
  isMobile: boolean;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export const ExploreFriends: FC<ExploreFriendsProps> = ({
  friendsPerPage,
  randomFriends,
  friendIds,
  isMobile,
  user = null,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [randomFriends, setRandomFriends] = useState<Friend[]>([]);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "left"
  );
  const theme = useTheme();
  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };
  return (
    <OuterWrapperBox isMobile={isMobile}>
      {isMobile ? ( // Use curly braces to start the JavaScript expression
        <MobileBox booksPerPage={friendsPerPage}>
          {randomFriends.map((friend) => (
            <Box key={friend.id} sx={{ width: "100%" }}>
              <ProfileCard
                friend={friend}
                friendIds={friendIds}
                {...(user ? { user } : {})}
              />
            </Box>
          ))}
        </MobileBox>
      ) : (
        <>
          <LeftIconButton
            booksPerPage={friendsPerPage}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
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
                  padding='0 0 0 0'
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
                        <ProfileCard
                          friend={friendItem}
                          friendIds={friendIds}
                          {...(user ? { user } : {})}
                        />
                      </Box>
                    ))}
                </Stack>
              </Slide>
            </BookBox>
          ))}
          <RightIconButton
            booksPerPage={friendsPerPage}
            onClick={handleNextPage}
            disabled={
              currentPage >=
              Math.ceil((randomFriends.length || 0) / friendsPerPage) - 1
            }
          >
            <NavigateNextIcon />
          </RightIconButton>
        </>
      )}
    </OuterWrapperBox>
  );
};
