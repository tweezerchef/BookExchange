import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { Books } from "@prisma/client";
import Box from "@mui/material/Box";
import ExploreBooksBox from "../Carousels/ExploreBooksBox";
import { ExploreFriendsBox } from "../Carousels/ExploreFriendsBox";

interface Step2FormProps {
  handleNext: () => void;
  handleBack: () => void;
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
}

const Step2Form: React.FC<Step2FormProps> = ({
  handleBack,
  books,
  setBooks,
}) => {
  const router = useRouter();

  const handleSubmit = () => {
    void router.push("/home");
  };

  return (
    <Box>
      <ExploreBooksBox books={books} setBooks={setBooks} />
      <ExploreFriendsBox />
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
