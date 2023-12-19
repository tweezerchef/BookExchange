import { Avatar, Stack } from "@mui/material";
import { User } from "@prisma/client";
import { FC, useEffect } from "react";
import { ProfileBox } from "./friendPageStyles";

interface ProfileProps {
  friend: User;
}

export const Profile: FC<ProfileProps> = ({ friend }) => {
  useEffect(() => {
    const getS3 = async () => {
      const response = await fetch(
        `/api/AWS/signedURL?fileNames=${friend.picture}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = (await response.json()) as string;
      console.log(data);
    };
  }, [friend]);
  return (
    <ProfileBox>
      <Stack>
        <Avatar />
      </Stack>
    </ProfileBox>
  );
};
