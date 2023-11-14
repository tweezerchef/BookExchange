import { Books } from "@prisma/client";
import { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ExploreBooks } from "./ExploreBooks";
import { useContainerQuery } from "./hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

interface ExploreBooksBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
ExploreBooksBox.defaultProps = {
  user: null,
};

export default function ExploreBooksBox({
  books,
  setBooks,
  user,
}: ExploreBooksBoxProps) {
  const containerRef = useRef(null);
  const theme = useTheme();

  const breakpoints = [
    { width: 900, itemsPerPage: 4 },
    { width: 700, itemsPerPage: 3 },
    { width: 500, itemsPerPage: 2 },
    { width: 320, itemsPerPage: 1 },
  ];

  const isViewportUnder700 = useMediaQuery("(max-width:700px)");
  const isViewportUnder500 = useMediaQuery("(max-width:500px)");

  const { itemsPerPage: containerItemsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  let booksPerPage: number;
  if (isViewportUnder500) {
    booksPerPage = 1; // 1 book per page under 500px
  } else if (isViewportUnder700) {
    booksPerPage = 2; // 2 books per page under 700px
  } else {
    booksPerPage = containerItemsPerPage; // Use container query result otherwise
  }

  const isMobile = useMediaQuery(theme.breakpoints.down(450));
  return (
    <ExploreBooksBoxWrapper isMobile={isMobile} ref={containerRef}>
      <ExploreBooks
        {...(user && { user })}
        books={books}
        setBooks={setBooks}
        booksPerPage={booksPerPage}
      />
    </ExploreBooksBoxWrapper>
  );
}
