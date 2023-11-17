/* eslint-disable react/require-default-props */
import { FC, useEffect, useState } from "react";
import { User } from "@prisma/client";
import Box from "@mui/material/Box";
import { AddFriendButton } from "./components/AddFriendButton";
import { MessageButton } from "./components/MessageButton";
import {
  GenreBox,
  StyledProfileCard,
  StyledAvatar,
  AvatarBox,
  NameTypography,
  CityTypography,
} from "./profileCardStyle";

type Friend = User;

interface ProfileCardProps {
  friend: Friend;
  friendIds: string[];
  user?: {
    id: string;
    email: string;
    username: string;
  };
}
interface UserGenre {
  genre: string;
}

interface UserWithGenres extends Friend {
  UserGenre: UserGenre[];
}

export const ProfileCard: FC<ProfileCardProps> = ({
  friend,
  friendIds,
  user = null,
}) => {
  const [profilePicture, setProfilePicture] = useState<string>("" || null);
  let isFriend = false;
  // const userGenres = (friend as UserWithGenres).UserGenre;
  const rawUserPicture = friend.picture;
  const friendId = friend.id;
  if (friendIds.includes(friendId)) {
    isFriend = true;
  }
  useEffect(() => {
    if (rawUserPicture) {
      fetch(`/api/AWS/signedURL?fileNames=${rawUserPicture}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data: Response) => {
          if ("url" in data) {
            setProfilePicture(data.url);
          } else {
            console.error("Not enough URLs in response");
          }
          if ("message" in data) {
            console.error("Error:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching signed URL:", error);
        });
    }
  }, [rawUserPicture]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <StyledProfileCard>
        <AvatarBox>
          <AddFriendButton
            friendId={friendId}
            isFriend={isFriend}
            {...(user ? { user } : {})}
          />
          <StyledAvatar alt='Remy Sharp' src={profilePicture} />
          <MessageButton />
        </AvatarBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <NameTypography variant='h6' align='center'>
            {friend.userName}
          </NameTypography>
          <CityTypography>{friend.city}</CityTypography>
        </Box>
      </StyledProfileCard>
    </Box>
  );
};
