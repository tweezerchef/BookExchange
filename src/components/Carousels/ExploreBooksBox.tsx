import { Books } from "@prisma/client";
import { ExploreBooks } from "./ExploreBooks";

interface ExploreBooksBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
}
export default function ExploreBooksBox({
  books,
  setBooks,
}: ExploreBooksBoxProps): JSX.Element {
  return <ExploreBooks books={books} setBooks={setBooks} />;
}
