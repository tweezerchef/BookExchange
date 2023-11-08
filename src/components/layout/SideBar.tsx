import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SideBar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md")); // or 'sm', 'lg', etc.
  if (matches) {
    return null;
  }

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
