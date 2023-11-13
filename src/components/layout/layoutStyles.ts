import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";


export const BackgroundImageBox = styled(Box)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;
export const SideBarBox = styled(Box)({
  position: "sticky",
        height: "100vh",
        width: "180px",
        backgroundColor:"transparent", // Set the background color
        padding: "0", // Add some padding
        overflowX: "clip",
        overflowY: 'auto',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
});