import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useRef } from "react";
import WishList from "./WishList";
import { useContainerQuery } from "./hooks/useContainerQuery";

export default function WishListBox() {
  const containerRef = useRef(null);
  const breakpoints = [
    { width: 1000, booksPerPage: 4 },
    { width: 600, booksPerPage: 3 },
    { width: 400, booksPerPage: 2 },
    { width: 0, booksPerPage: 1 },
    // Add as many breakpoints as you need
  ];

  const booksPerPage: number = useContainerQuery(containerRef, breakpoints);

  return (
    <Box ref={containerRef} width='100%'>
      <Divider textAlign='right'>
        <Chip label='Your Wish List' />
      </Divider>
      <WishList booksPerPage={booksPerPage} />
    </Box>
  );
}
