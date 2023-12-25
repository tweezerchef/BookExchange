import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import { useHomeState } from "../context/context";
import { PickBookBox } from "../components/clubs/PickBookBox";
import { CreateClubHeader } from "../components/clubs/createClub/CreateClubHeader";
import {
  CreateClubBox,
  HeaderContainer,
  ContentContainer,
} from "../styles/pageStyles/pageStyles";

export default function CreateClub() {
  const { user, randomBooks } = useHomeState();
  const [books, setBooks] = useState<Books[]>([]);
  const [clubBook, setClubBook] = useState<Books | null>(null);

  useEffect(() => {
    if (!randomBooks) return;
    setBooks(randomBooks);
  }, [randomBooks]);

  return (
    <CreateClubBox>
      <HeaderContainer>
        <CreateClubHeader clubBook={clubBook} />
      </HeaderContainer>

      <ContentContainer>
        <PickBookBox
          books={books}
          setBooks={setBooks}
          setClubBook={setClubBook}
        />
      </ContentContainer>
    </CreateClubBox>
  );
}
