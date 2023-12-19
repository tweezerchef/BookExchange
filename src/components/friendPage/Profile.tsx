import { Avatar, Stack } from "@mui/material";
import { User } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { ProfileBox } from "./friendPageStyles";

interface ProfileProps {
  friend: User;
}
type Data = {
  url: string;
};

export const Profile: FC<ProfileProps> = ({ friend }) => {
  const [avi, setAvi] = useState<string>("");
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
      const data: Data = (await response.json()) as Data;
      const { url } = data;
      if (url) {
        setAvi(url);
      }
    };
    if (friend.picture) {
      getS3();
    }
  }, [friend]);
  return (
    <ProfileBox>
      <Stack>
        <Avatar src={avi} />
      </Stack>
    </ProfileBox>
  );
};
