import { useEffect, useState, useCallback, memo } from "react";
import useSWR, { SWRConfig } from "swr";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
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
import { parse } from "cookie";

interface UserData {
  email: string;
  id: string;
  username: string | null;
}

interface HomeProps {
  user: UserData;
  wishlistData: any;
  wishlistIdsData: any;
  lendingLibraryIdsData: any;
  starRatingData: any;
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

    // Define a fetcher function for SWR
    const fetcher = async (url: RequestInfo | URL) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    const { data: updatedWishlist } = useSWR(
      `/api/user/wishList/${user.id}`,
      fetcher
    );
    const { data: updatedWishlistIDs } = useSWR(
      `/api/user/wishListIDs/${user.id}`,
      fetcher
    );
    const { data: updatedStarRatings } = useSWR(
      `/api/user/starRating/${user.id}`,
      fetcher
    );
    const { data: updatedLendingLibraryIDs } = useSWR(
      `/api/user/lendingLibraryIDs/${user.id}`,
      fetcher
    );

    useEffect(() => {
      if (
        updatedWishlist &&
        updatedLendingLibraryIDs &&
        updatedWishlistIDs &&
        updatedStarRatings
      ) {
        dispatch({ type: SET_WISHLIST, payload: updatedWishlist });
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: updatedLendingLibraryIDs,
        });
        dispatch({ type: SET_WISHLIST_IDS, payload: updatedWishlistIDs });
        dispatch({ type: SET_STAR_RATINGS, payload: updatedStarRatings });
        setIsLoading(false);
      }
    }, [
      dispatch,
      updatedWishlist,
      updatedLendingLibraryIDs,
      updatedWishlistIDs,
      updatedStarRatings,
    ]);

    // Fetch user data initially (you can use SWR here too if needed)
    useEffect(() => {
      console.log("home", starRatingData);
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_WISHLIST, payload: wishlistData });
      dispatch({ type: SET_WISHLIST_IDS, payload: wishlistIdsData });
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: lendingLibraryIdsData,
      });
      dispatch({ type: SET_STAR_RATINGS, payload: starRatingData });
    }, [dispatch, user, wishlistData, wishlistIdsData, lendingLibraryIdsData]);

    // Your existing handleError function for error handling
    const handleError = useCallback((error: any) => {
      console.error(error);
      // Additional error handling logic
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <SWRConfig value={{ onError: handleError }}>
        <Grid container maxWidth='1500px'>
          <Grid xs={2}>
            <h1>Yo</h1>
          </Grid>
          <Grid xs={10} minWidth='1000px'>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                backgroundImage:
                  "url(https://nobe.s3.us-east-2.amazonaws.com/TopBanner.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: "24px",
              }}
            />
            <ExploreBooksBox />
            <WishListBox />
          </Grid>
        </Grid>
      </SWRConfig>
    );
  }
);

export const getServerSideProps = async (context: { req: any }) => {
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
  const userProp = JSON.parse(userCookie);

  const baseUrl = req ? `http://${req.headers.host}` : "";

  const userUrl = `${baseUrl}/api/user/id/${userProp.id}`;
  const wishlistUrl = `${baseUrl}/api/user/wishList/${userProp.id}`;
  const wishlistIdsUrl = `${baseUrl}/api/user/wishListIDs/${userProp.id}`;
  const lendingLibraryIdsUrl = `${baseUrl}/api/user/lendingLibraryIDs/${userProp.id}`;
  const starRatingURL = `${baseUrl}/api/user/starRating/${userProp.id}`;

  const [
    userResponse,
    wishlistResponse,
    wishlistIdsResponse,
    lendingLibraryIdsResponse,
    starRatingResponse,
  ] = await Promise.all([
    fetch(userUrl),
    fetch(wishlistUrl),
    fetch(wishlistIdsUrl),
    fetch(lendingLibraryIdsUrl),
    fetch(starRatingURL),
  ]);

  const userData = await userResponse.json();
  const wishlistData = await wishlistResponse.json();
  const wishlistIdsData = await wishlistIdsResponse.json();
  const lendingLibraryIdsData = await lendingLibraryIdsResponse.json();
  const starRatingData = await starRatingResponse.json();

  return {
    props: {
      user: userData,
      wishlistData: wishlistData,
      wishlistIdsData: wishlistIdsData,
      lendingLibraryIdsData: lendingLibraryIdsData,
      starRatingData: starRatingData,
    },
  };
};

export default Home;
