import Image from "next/image";
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { styled } from '@compiled/react';

export const CenteredModal = styled(Dialog)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;

    .MuiDialog-paper {
    position: absolute;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 60vh;
    min-height: 400px;
    max-height: 800px;
    min-width: 500px;
    max-width: 600px;
    z-index: 999;
    background-color: rgba(215, 240, 255, 0.897);
    }
    .backgroundImage{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: -1;
    }
  }
`;
export const BookImage = styled(Image)`
filter: contrast()(1.2);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;
export const CloseButtonContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
`;

export const TopContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
  min-height: 300px;
  justify-content: start;
  align-items: start;
  background-color: #e1e8ed8a;
`;

export const ImageBox = styled(Box)`
  position: relative;
  width: 60%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;

`;

export const SideOfImageBox = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 70%;
  height: 100%;
  overflow: hidden;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  cursor: pointer;
`;

export const ContentContainer = styled(Box)`
  margin-top: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center; // Vertically center the content
  align-items: center; // Horizontally center the content
  justify-items: center;
  width: 100%;
  height: auto; // Take up the remaining space
  text-align: center; // Center the text
  text-justify: center;
`;

export const AddReviewModal = styled(Dialog)`
&& {
  .MuiDialog-paper {
 background-color: rgba(215, 240, 255, 1);
  }
}
 `
