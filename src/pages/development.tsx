import Container from "@mui/material/Container";
import { Books, Clubs } from "@prisma/client";
import { ClubCard } from "../components/clubs/ClubCard";

interface ClubType extends Clubs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Clubs_Books: any;
}

const CardDevelopmentPage = (props) => {
  const club: ClubType = {
    id: "123415gdasdi",
    name: "The Book Club",
    description: "We read books",
    image: "blackBook.jpg",
    memberCount: 3,
    discussionCount: 5,
    Clubs_Books: [
      {
        id: "007fb8bf-3aa1-44a6-a681-dfcecafca9df",
        title: "Allegiant",
        author: "Veronica Roth",
        description:
          "The explosive conclusion to Veronica Roth's #1 New York Times bestselling Divergent trilogy reveals the secrets of the dystopian world that captivated millions of readers and film fans in Divergent and Insurgent. This paperback edition includes bonus content by Veronica Roth! One choice will define you. What if your whole world was a lie? What if a single revelation—like a single choice—changed everything? What if love and loyalty made you do things you never expected? Told from a riveting dual perspective, this third installment in the series follows Tris and Tobias as they battle to comprehend the complexities of human nature—and their selves—while facing impossible choices of courage, allegiance, sacrifice, and love.",
        image:
          "http://books.google.com/books/content?id=V9xkrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        ISBN10: "0062024078",
      },
    ],
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention

  return (
    <Container>
      <ClubCard club={club} />
    </Container>
  );
};

export default CardDevelopmentPage;
