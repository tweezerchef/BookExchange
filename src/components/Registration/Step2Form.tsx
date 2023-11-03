import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { Books } from "@prisma/client";
import ExploreBooksBox from "../Carousels/ExploreBooksBox";
import { ExploreFriends } from "../Carousels/ExploreFriends";

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
    <>
      <ExploreBooksBox books={books} setBooks={setBooks} />
      <ExploreFriends />
      <Button onClick={handleBack} variant='contained'>
        Back
      </Button>
      <Button onClick={handleSubmit} variant='contained' color='primary'>
        Let's Go!
      </Button>
    </>
  );
};

export default Step2Form;
