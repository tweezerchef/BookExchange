import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import { useHomeState } from "../context/context";
import { PickBookBox } from "../components/clubs/PickBookBox";

export default function CreateClub() {
  const { user, randomBooks } = useHomeState();
  const [books, setBooks] = useState<Books[]>([]);
  const [clubBook, setClubBook] = useState<Books>(null);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubImage, setClubImage] = useState("");

  useEffect(() => {
    if (!randomBooks) return;
    setBooks(randomBooks);
  }, [randomBooks]);

  return (
    <>
      <h1>Create Club</h1>
      <PickBookBox
        books={books}
        setBooks={setBooks}
        user={user}
        setClubBook={setClubBook}
      />
    </>
  );
}
