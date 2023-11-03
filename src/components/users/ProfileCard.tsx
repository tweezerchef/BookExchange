import { FC, useEffect, useState } from "react";
import { User } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GenreIcons } from "./components/GenreIcons";
import { AddFriendButton } from "./components/AddFriendButton";
import { MessageButton } from "./components/MessageButton";
import {
  GenreBox,
  StyledProfileCard,
  StyledAvatar,
  AvatarBox,
  NameTypography,
} from "./profileCardStyle";

type Friend = User;

interface ProfileCardProps {
  friend: Friend;
}
interface UserGenre {
  genre: string;
}

interface UserWithGenres extends Friend {
  UserGenre: UserGenre[];
}

export const ProfileCard: FC<ProfileCardProps> = ({ friend }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("" || null);

  const userGenres = (friend as UserWithGenres).UserGenre;
  const rawUserPicture = friend.picture;
  const friendId = friend.id;
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
            // data is of type ErrorMessage
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
          <AddFriendButton friendId={friendId} />
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
          <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            sx={{ textShadow: "0px 1px 2px rgba(255, 255, 255, 0.5)" }}
          >
            {friend.city}
            <br />
            Favorite Genres
          </Typography>
        </Box>
      </StyledProfileCard>
    </Box>
  );
};
