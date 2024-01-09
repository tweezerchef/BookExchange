import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useHomeState } from "../context/context";
import { PickBookBox } from "../components/clubs/PickBookBox";
import { CreateClubHeader } from "../components/clubs/createClub/CreateClubHeader";
import { HeaderContainer } from "../styles/pageStyles/pageStyles";

export default function CreateClub(props) {
  const { randomBooks } = useHomeState();
  const [books, setBooks] = useState<Books[]>([]);
  const [clubBook, setClubBook] = useState<Books | null>(null);

  useEffect(() => {
    if (!randomBooks) return;
    setBooks(randomBooks);
  }, [randomBooks]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Container>
        <Typography variant='h2' align='center'>
          Create a Club
        </Typography>
      </Container>
      <HeaderContainer>
        <CreateClubHeader clubBook={clubBook} />
      </HeaderContainer>
      <PickBookBox
        books={books}
        setBooks={setBooks}
        setClubBook={setClubBook}
      />
    </Box>
  );
}
