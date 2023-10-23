import { useEffect, useState, useCallback, memo } from "react";
import { User, Books } from "@prisma/client";
import Box from "@mui/material/Box";
import { parse } from "cookie";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import WishListBox from "../components/Carousels/wistListBox";
import ExploreBooksBox from "../components/Carousels/exploreBooksBox";
import { useUserDispatch } from "../context/context";
import {
  SET_USER,
  SET_WISHLIST,
  SET_WISHLIST_IDS,
  SET_LENDING_LIBRARY_IDS,
  SET_STAR_RATINGS,
} from "../context/actions";

interface StarRating {
  bookID: string;
  rating: number;
}

interface HomeProps {
  user: User;
  wishlistData: Books[];
  wishlistIdsData: Books["id"][];
  lendingLibraryIdsData: Books["id"][];
  starRatingData: StarRating[];
}

const Home: React.FC<HomeProps> = memo(
  ({
    user,
    wishlistData,
    wishlistIdsData,
    lendingLibraryIdsData,
    starRatingData,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useUserDispatch();

    // Fetch user data initially (you can use SWR here too if needed)
    useEffect(() => {
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_WISHLIST, payload: wishlistData });
      dispatch({ type: SET_WISHLIST_IDS, payload: wishlistIdsData });
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: lendingLibraryIdsData,
      });
      dispatch({ type: SET_STAR_RATINGS, payload: starRatingData });
      setIsLoading(false);
    }, [
      dispatch,
      lendingLibraryIdsData,
      starRatingData,
      user,
      wishlistData,
      wishlistIdsData,
    ]);

    return (
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Link href='./register'>Register</Link>
        <ExploreBooksBox />
        <WishListBox />
      </Box>
    );
  }
);

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.headers.cookie;
  const userCookie = cookies && parse(cookies).user;

  if (!userCookie) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userProp: { id: string } = JSON.parse(userCookie);
  const baseUrl = req ? `http://${req.headers.host}` : "";
  const userId = userProp.id;

  const urls = {
    user: `${baseUrl}/api/user/id/${userId}`,
    wishlist: `${baseUrl}/api/user/wishList/${userId}`,
    wishlistIds: `${baseUrl}/api/user/wishListIDs/${userId}`,
    lendingLibraryIds: `${baseUrl}/api/user/lendingLibraryIDs/${userId}`,
    starRating: `${baseUrl}/api/user/starRating/${userId}`,
  };

  const responses = await Promise.allSettled(
    Object.values(urls).map((url) => fetch(url))
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data: [
    User | null,
    Books[] | null,
    Books["id"][] | null,
    Books["id"][] | null,
    StarRating[] | null,
  ] = await Promise.all(
    responses.map(async (response) => {
      if (response.status === "fulfilled") {
        return response.value.json();
      }
      // Handle error or unavailable API here
      return null;
    })
  );

  const [
    user,
    wishlistData,
    wishlistIdsData,
    lendingLibraryIdsData,
    starRatingData,
  ] = data;

  return {
    props: {
      user,
      wishlistData,
      wishlistIdsData,
      lendingLibraryIdsData,
      starRatingData,
    },
  };
};
Home.displayName = "Home";
export default Home;
