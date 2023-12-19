import { Container } from "@mui/material";
import { Books, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Profile } from "../components/friendPage/Profile";
import { LendingLibraryBox } from "../components/friendPage/carousels/lendingLibraryBox";

type Data = {
  user: User;
  wishlistBooks: Books[];
  lendingLibraryBooks: Books[];
};

export default function FriendPage(props) {
  const [wishlist, setWishlist] = useState<Books[]>([]);
  const [lendingLibrary, setLendingLibrary] = useState<Books[]>([]);
  const [friend, setFriend] = useState<User | null>(null);
  const router = useRouter();
  const { friendId } = router.query;

  useEffect(() => {
    if (friendId && typeof friendId === "string") {
      fetch(`/api/friend/getFriend?IdString=${friendId}`)
        .then((response) => response.json())
        .then((data: Data) => {
          const { user, wishlistBooks, lendingLibraryBooks } = data;
          setFriend(user);
          setWishlist(wishlistBooks);
          setLendingLibrary(lendingLibraryBooks);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [friendId]);
  return (
    <Container>
      <div style={{ height: "3vh" }} />
      {friend && <Profile friend={friend} />}
      {lendingLibrary.length > 0 && (
        <LendingLibraryBox lendingLibrary={lendingLibrary} />
      )}
    </Container>
  );
}
