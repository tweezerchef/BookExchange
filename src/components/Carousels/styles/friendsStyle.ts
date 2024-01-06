import { styled } from '@compiled/react'
import Box, { BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Friends } from '@prisma/client';

interface FriendsBoxProps extends BoxProps {
  isMobile: boolean;
}

interface MobileBoxProps extends BoxProps {
  booksPerPage: number;
}



export const FriendsBoxWrapper = styled(Box)<FriendsBoxProps>`
${({ isMobile }) => ({
  minHeight: isMobile ? "30vw" : "150px",
  maxHeight: isMobile ? "80vw" : "235px",
  marginTop: isMobile ? ".2vh" : "1.5vh",
  minWidth: isMobile ? "100%" : "630px",
  width: "100%",
  overflow: "clip",
  alightItems: "center",
  alightContent: "center",
})}
`;