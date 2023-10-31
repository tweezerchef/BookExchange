import { FC, useEffect, useState } from "react";
import { User } from "@prisma/client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

export const ProfileCard: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("" || null);
  const [rawUserPicture, setRawUserPicture] = useState<string>("" || null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
      setRawUserPicture(userObj.picture);
    }
  }, []);

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
    <Container maxWidth='sm'>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 345, minHeight: 200, minWidth: 150 }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}
          >
            <Avatar
              alt='Remy Sharp'
              src={profilePicture}
              sx={{ width: 70, height: 70 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant='h6' align='center'>
              {user?.userName}
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              {user?.city}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
