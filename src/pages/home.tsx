/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import { User, Books } from "@prisma/client";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps as exportedGetServerSideProps } from "../utils/homeUtil/getServerSideProps";
import WishListBox from "../components/Carousels/WistListBox";
import { ExploreBooksBox } from "../components/Carousels/ExploreBooksBox";
import { ExploreFriendsBox } from "../components/Carousels/ExploreFriendsBox";
import { BooksNearMeBox } from "../components/Carousels/BooksNearMeBox";
import { SuggestedBooksBox } from "../components/Carousels/SuggestedBooksBox";
import { useHomeDispatch } from "../context/context";
import {
  SET_USER,
  SET_WISHLIST,
  SET_WISHLIST_IDS,
  SET_LENDING_LIBRARY_IDS,
  SET_STAR_RATINGS,
  SET_IMAGE_URLS_OBJECT,
  SET_RANDOM_BOOKS,
} from "../context/actions";
import { Messages } from "../components/messages/Messages";
import { HomeBox } from "../styles/pageStyles/pageStyles";

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
      if (randomBooks) {
        console.log("randomBooks", randomBooks);
        dispatch({ type: SET_RANDOM_BOOKS, payload: randomBooks });
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
      <HomeBox>
        <Link href={`/club/55262086-79de-492a-85b1-626b0d44d530`}>
          Go to Club
        </Link>

        {books && !isLoading && (
          <>
            <Link href='/createClub'>Create Club</Link>
            <ExploreBooksBox books={books} setBooks={setBooks} />
            <ExploreFriendsBox />
            <WishListBox />
            <BooksNearMeBox />
            {/* <SuggestedBooksBox /> */}
          </>
        )}
        <Messages />
      </HomeBox>
    );
  }
);
export { exportedGetServerSideProps as getServerSideProps };
Home.displayName = "Home";
export default Home;
