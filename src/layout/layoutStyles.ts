import { styled } from '@compiled/react'
import { Box } from "@mui/material";


export const BackgroundImageBox = styled(Box)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;
export const SideBarBox = styled('div')({
  width: 180,
  height: "100vh",
  overflowX: "auto",
  position: "sticky",
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
});