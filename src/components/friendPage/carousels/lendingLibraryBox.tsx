import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { FC, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Books } from "@prisma/client";
import { LendingLibrary } from "./LendingLibrary";
import { useContainerQuery } from "../../Carousels/hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "../../Carousels/styles/exploreBooksStyle";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

type LendingLibraryProps = {
  lendingLibraryBooks: Books[];
};
export const LendingLibraryBox: FC<LendingLibraryProps> = ({
  lendingLibraryBooks,
}) => {
  const containerRef = useRef(null);
  const theme = useTheme();

  const breakpoints = [
    { width: 900, itemsPerPage: 4 },
    { width: 650, itemsPerPage: 3 },
    { width: 460, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 2 },
  ];

  const isViewportUnder450 = useMediaQuery("(max-width:450px)");

  const { itemsPerPage: containerItemsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  let booksPerPage: number;
  if (isViewportUnder450) {
    booksPerPage = 5; // 1 book per page under 500px
  } else {
    booksPerPage = containerItemsPerPage; // Use container query result otherwise
  }

  const isMobile = useMediaQuery(theme.breakpoints.down(450));
  return (
    <ExploreBooksBoxWrapper isMobile={isMobile} ref={containerRef}>
      <Divider textAlign='right'>
        <Chip label='Your Wish List' />
      </Divider>
      <LendingLibrary
        booksPerPage={booksPerPage}
        lendingLibraryBooks={lendingLibraryBooks}
      />
    </ExploreBooksBoxWrapper>
  );
};
