import { useEffect, useState, memo } from "react";
import { User, Books } from "@prisma/client";
import Box from "@mui/material/Box";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps as exportedGetServerSideProps } from "../utils/homeUtil/getServerSideProps";
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
export { exportedGetServerSideProps as getServerSideProps };
Home.displayName = "Home";
export default Home;
