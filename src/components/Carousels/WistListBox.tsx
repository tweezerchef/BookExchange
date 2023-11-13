import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useRef } from "react";
import WishList from "./WishList";
import { useContainerQuery } from "./hooks/useContainerQuery";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

export default function WishListBox() {
  const containerRef = useRef(null);
  const breakpoints = [
    { width: 900, itemsPerPage: 4 },
    { width: 800, itemsPerPage: 3 },
    { width: 400, itemsPerPage: 2 },
    { width: 300, itemsPerPage: 1 },
    { width: 0, itemsPerPage: 1 },
  ];

  const { itemsPerPage: booksPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  return (
    <Box ref={containerRef} width='100%'>
      <Divider textAlign='right'>
        <Chip label='Your Wish List' />
      </Divider>
      <WishList booksPerPage={booksPerPage} />
    </Box>
  );
}
