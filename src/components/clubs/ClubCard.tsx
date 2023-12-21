import { FC, useEffect, useState } from "react";
import { Clubs } from "@prisma/client";
import { Box } from "@mui/material";
import Image from "next/image";

interface ClubProps {
  club: Clubs;
}

export const ClubCard: FC<ClubProps> = ({ club }) => {
  const { id, name, description, image, memberCount, discussionCount } = club;
  const [clubImage, setClubImage] = useState<string>("");

  useEffect(() => {
    const getS3 = async () => {
      const response = await fetch(`/api/AWS/signedURL?fileNames=${image}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as { url: string };
      const { url } = data;
      if (url) {
        setClubImage(url);
      }
    };

    getS3();
  }, [image]);

  return (
    <Box>
      <Image src={clubImage} width={200} height={200} alt={name} />
    </Box>
  );
};
