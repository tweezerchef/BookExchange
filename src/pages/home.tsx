/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo, useCallback } from "react";
import { User, Books } from "@prisma/client";
import Box from "@mui/material/Box";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { Image } from "aws-sdk/clients/iotanalytics";
import { getServerSideProps as exportedGetServerSideProps } from "../utils/homeUtil/getServerSideProps";
import WishListBox from "../components/Carousels/wistListBox";
import ExploreBooksBox from "../components/Carousels/exploreBooksBox";
import { useHomeDispatch } from "../context/context";
import {
  SET_USER,
  SET_WISHLIST,
  SET_WISHLIST_IDS,
  SET_LENDING_LIBRARY_IDS,
  SET_STAR_RATINGS,
  SET_IMAGE_URLS_OBJECT,
} from "../context/actions";

interface ImageUrls {
  [key: string]: string;
}

interface StarRating {
  bookID: string;
  rating: number;
}

interface HomeProps {
  randomBooks: Books[];
  imageUrlsObject: ImageUrls;
  user: User;
  wishlistData: Books[];
  wishlistIdsData: Books["id"][];
  lendingLibraryIdsData: Books["id"][];
  starRatingData: StarRating[];
}

const Home: React.FC<HomeProps> = memo(
  ({
    randomBooks,
    imageUrlsObject,
    user,
    wishlistData,
    wishlistIdsData,
    lendingLibraryIdsData,
    starRatingData,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useHomeDispatch();
    const [books, setBooks] = useState<Books[]>(randomBooks);

    useEffect(() => {
      dispatch({ type: SET_IMAGE_URLS_OBJECT, payload: imageUrlsObject });
      dispatch({ type: SET_USER, payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_WISHLIST, payload: wishlistData });
      dispatch({ type: SET_WISHLIST_IDS, payload: wishlistIdsData });
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: lendingLibraryIdsData,
      });
      dispatch({ type: SET_STAR_RATINGS, payload: starRatingData });
      setIsLoading(false);
    }, []);

    return (
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {books && !isLoading && (
          <>
            <Link href='./register'>Register</Link>
            <Link href='./development'>Development</Link>
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
