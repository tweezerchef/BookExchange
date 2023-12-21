import { FC, useEffect, useState } from "react";
import { Clubs } from "@prisma/client";
import Image from "next/image";
import { Box } from "@mui/material";
import {
  StyledClubBox,
  ClubImageBox,
  NameTypography,
  LowerClubBox,
} from "../clubCardStyle";

interface ClubBoxProps {
  image: string;
  name: string;
}

export const ClubBox: FC<ClubBoxProps> = ({ image, name }) => {
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
    <StyledClubBox>
      <ClubImageBox>
        <Image src={clubImage} fill alt={name} />
      </ClubImageBox>
      <LowerClubBox>
        <NameTypography>{name}</NameTypography>
      </LowerClubBox>
    </StyledClubBox>
  );
};
