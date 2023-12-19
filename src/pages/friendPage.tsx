import { Container } from "@mui/material";
import { Books, User } from "@prisma/client";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function FriendPage(props) {
  const [wishlist, setWishlist] = useState<Books[]>([]);
  const [lendingLibrary, setLendingLibrary] = useState<Books[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { friendId } = router.query;
  console.log("friendIdtype", typeof friendId);

  useEffect(() => {
    console.log("friendIdString", friendId);
    if (friendId && typeof friendId === "string") {
      console.log("passed");
      fetch(`/api/friend/getFriend?IdString=${friendId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("friendData", data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [friendId]);
  return (
    <Container>
      <h1>Friend Page</h1>
    </Container>
  );
}
