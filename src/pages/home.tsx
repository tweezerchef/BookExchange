/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import { User, Books } from "@prisma/client";
import Box from "@mui/material/Box";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps as exportedGetServerSideProps } from "../utils/homeUtil/getServerSideProps";
import WishListBox from "../components/Carousels/WistListBox";
import { ExploreBooksBox } from "../components/Carousels/ExploreBooksBox";
import { ExploreFriendsBox } from "../components/Carousels/ExploreFriendsBox";
import { SuggestedBooksBox } from "../components/Carousels/SuggestedBooksBox";
import { useHomeDispatch } from "../context/context";
import {
  SET_USER,
  SET_WISHLIST,
  SET_WISHLIST_IDS,
  SET_LENDING_LIBRARY_IDS,
  SET_STAR_RATINGS,
  SET_IMAGE_URLS_OBJECT,
} from "../context/actions";
import { Messages } from "../components/messages/Messages";

interface ImageUrls {
  [key: string]: string;
}

interface StarRating {
  bookID: string;
  rating: number;
  ISBN10: string;
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
      if (imageUrlsObject) {
        dispatch({ type: SET_IMAGE_URLS_OBJECT, payload: imageUrlsObject });
      }
      if (user) {
        dispatch({ type: SET_USER, payload: user });
      }
      if (wishlistData) {
        dispatch({ type: SET_WISHLIST, payload: wishlistData });
      }
      if (wishlistIdsData) {
        dispatch({ type: SET_WISHLIST_IDS, payload: wishlistIdsData });
      }
      if (lendingLibraryIdsData) {
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: lendingLibraryIdsData,
        });
      }
      if (starRatingData) {
        dispatch({ type: SET_STAR_RATINGS, payload: starRatingData });
      }
      setIsLoading(false);
    }, []);

    return (
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {books && !isLoading && (
          <>
            {/* <Link href='./register'>Register</Link>
            <Link href='./development'>Development</Link> */}
            <ExploreBooksBox books={books} setBooks={setBooks} />
            <ExploreFriendsBox />
            <WishListBox />

            {/* <SuggestedBooksBox /> */}
          </>
        )}
        <Messages />
      </Box>
    );
  }
);
export { exportedGetServerSideProps as getServerSideProps };
Home.displayName = "Home";
export default Home;
