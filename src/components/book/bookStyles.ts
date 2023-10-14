import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";

    export const StyledBookCard = styled(Card)`
      width: 18vw;
      height: 20vw;
      min-height: 170px;
      max-height: 250px;
      min-width: 220px;
      max-width: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
        export const TopContainer = styled(Box)`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 60%;
        justify-content: start;
        align-items: start;
        background-color: transparent;
      `;

    export const ImageBox = styled(Box)`
      position: relative;
      width: 80%;
      height: 100%;
      overflow: hidden;
      /* align-content: center; */
      /* justify-content: start; */
      background-color: transparent;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    `;

    export const SideOfImageBox = styled(Box)`
      display: flex;
      /* position: relative; */
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
      justify-content: flex-start;
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
      align-items: center;     // Horizontally center the content
      width: 100%;
      height: auto;            // Take up the remaining space
      text-align: center;      // Center the text
    `;

    export const TitleTypography = styled(Typography)`
    /* max-height: 50%; // Adjust as needed */
    text-overflow: ellipsis;
    white-space: pre-line;
    line-height: 1.2em; // Or whatever line height you want
    /* padding: 0 5px; // Add some padding to prevent text touching the edges */
  `;
  export const CenteredModal = styled(Dialog)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent; // Ensure the Dialog's background is transparent
    .MuiDialog-paper {
      background-color: white;
      border-radius: 4px;
      height: 80vh;
      width: 80vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow-y: unset;
      margin: 0;
      max-width: fit-content;
      box-shadow: none;
    }
  }
`;


