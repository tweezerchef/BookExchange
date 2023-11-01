import { FC, useEffect, useState } from "react";
import { User } from "@prisma/client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { GenreIcons } from "./components/GenreIcons";
import { AddFriendButton } from "./components/AddFriendButton";
import { MessageButton } from "./components/MessageButton";
import { StyledProfileCard } from "./profileCardStyle";

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
        .then((data: ApiResponse) => {
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
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <StyledProfileCard>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            paddingTop: 2,
          }}
        >
          <AddFriendButton friendId={friendId} />
          <Avatar
            alt='Remy Sharp'
            src={profilePicture}
            sx={{ width: 70, height: 70 }}
          />
          <MessageButton />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant='h6' align='center'>
            {friend.userName}
          </Typography>
          <Typography variant='body2' color='text.secondary' align='center'>
            {friend.city}
          </Typography>
          {userGenres && <GenreIcons userGenres={userGenres} />}
        </Box>
      </StyledProfileCard>
    </Box>
  );
};
