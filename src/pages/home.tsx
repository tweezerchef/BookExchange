/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo, useCallback } from "react";
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
    const [books, setBooks] = useState<Books[]>([]);
    const getRandomBooks = useCallback(() => {
      fetch("/api/bookDB/randomBooks")
        .then((res) => res.json())
        .then((data: Books[]) => {
          setBooks(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching random books:", error);
          setIsLoading(false);
        });
    }, []);
    useEffect(() => {
      getRandomBooks();
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_WISHLIST, payload: wishlistData });
      dispatch({ type: SET_WISHLIST_IDS, payload: wishlistIdsData });
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: lendingLibraryIdsData,
      });
      dispatch({ type: SET_STAR_RATINGS, payload: starRatingData });
    }, []);

    return (
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {books && !isLoading && (
          <>
            <Link href='./register'>Register</Link>
            <ExploreBooksBox books={books} setBooks={setBooks} />
            <WishListBox />
          </>
        )}
      </Box>
    );
  }
);
export { exportedGetServerSideProps as getServerSideProps };
Home.displayName = "Home";
export default Home;
