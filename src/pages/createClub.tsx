import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHomeState } from "../context/context";
import { PickBookBox } from "../components/clubs/PickBookBox";
import { CreateClubHeader } from "../components/clubs/createClub/CreateClubHeader";
import {
  CreateClubBox,
  HeaderContainer,
  ContentContainer,
  BannerContainer,
} from "../styles/pageStyles/pageStyles";

export default function CreateClub(props) {
  const { randomBooks } = useHomeState();
  const [books, setBooks] = useState<Books[]>([]);
  const [clubBook, setClubBook] = useState<Books | null>(null);

  useEffect(() => {
    if (!randomBooks) return;
    setBooks(randomBooks as Books[]);
  }, [randomBooks]);

  return (
    <>
      <Container>
        <Typography variant='h2' align='center'>
          Create a Club
        </Typography>
      </Container>
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
    </>
  );
}
