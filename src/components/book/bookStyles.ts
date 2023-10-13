import { styled } from "@mui/system";
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
        export const StyledBoxContainer = styled(Box)`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 55%; // Ensure it takes up the maximum height
        justify-content: start;
        align-items: start;
        background-color: transparent;
      `;

    export const StyledBookCardImageBox = styled(Box)`
      position: relative;
      width: 80%;
      height: 100%;
      overflow: hidden;
      /* align-content: center; */
      /* justify-content: start; */
      margin: 0;
      padding: 0;
      background-color: transparent;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    `;
    export const StyledSideOfBookBox = styled(Box)`
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      align-content: center;
      margin: 0;
      padding: 0;
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
