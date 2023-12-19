import { useRouter } from "next/router";
import { use } from "passport";
import { useEffect } from "react";

export default function FriendPage(props) {
  const router = useRouter();
  const { friendId } = router.query;
  const IdString = friendId.toString;

  useEffect(() => {
    if (IdString && typeof IdString === "string") {
      fetch(`/api/friend/getFriend?friendId=${IdString as string}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
  return <div>Friend Page</div>;
}
