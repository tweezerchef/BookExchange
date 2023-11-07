import { Box, Typography } from "@mui/material";

export default function SideBar() {
  return (
    <Box
      sx={{
        position: "sticky",
        width: "15%",
        backgroundColor: "#fffaf0", // Set the background color
        padding: "16px", // Add some padding
        overflowY: "auto", // Enable scrolling for the feed
        flexShrink: 0,
      }}
    >
      {/* Vertical feed content */}
      <Box>
        <Typography variant='h6'>Feed</Typography>
        {/* Feed items */}
        <Box>
          <Typography variant='body1' />
        </Box>
        <Box>
          <Typography variant='body1' />
        </Box>
        {/* Add more feed items here */}
      </Box>
    </Box>
  );
}
