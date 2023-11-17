import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { Books } from "@prisma/client";
import Box from "@mui/material/Box";
import { useState } from "react";
import ExploreBooksBox from "../Carousels/ExploreBooksBox";
import { ExploreFriendsBox } from "../Carousels/ExploreFriendsBox";

interface UserCookie {
  id: string;
  email: string;
  username: string;
}

interface Step2FormProps {
  handleBack: () => void;
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  user: UserCookie;
}

const Step2Form: React.FC<Step2FormProps> = ({
  handleBack,
  books,
  setBooks,
  user,
}) => {
  const [step2, setStep2] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    void router.push("/login");
  };

  return (
    <Box width='100%'>
      <ExploreBooksBox books={books} setBooks={setBooks} user={user} />
      <ExploreFriendsBox user={user} />
      <Button onClick={handleBack} variant='contained'>
        Back
      </Button>
      <Button onClick={handleSubmit} variant='contained' color='primary'>
        Let's Go!
      </Button>
    </Box>
  );
};

export default Step2Form;
