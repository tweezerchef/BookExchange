import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

    export const StyledBookCard = styled(Card)`
      width: 18vw;
      height: 33vw;
      min-height: 260px;
      max-height: 300px;
      min-width: 220px;
      max-width: 250px;
      /* box-shadow: 5px 5px 7px  rgba(37, 37, 37, 0.6); */
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
        export const TopContainer = styled(Box)`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50%;
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
      background-color: transparent;
      cursor: pointer;
    `;


    export const ContentContainer = styled(Box)`
      display: flex;
      flex-direction: column;
      justify-content: center; // Vertically center the content
      align-items: center;     // Horizontally center the content
      width: 100%;
      height: auto;            // Take up the remaining space
      text-align: center;      // Center the text
    `;
    export const TitleTypography = styled(Typography)`
    max-height: 45%; // Adjust as needed
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
    padding: 0 5px; // Add some padding to prevent text touching the edges
  `;

