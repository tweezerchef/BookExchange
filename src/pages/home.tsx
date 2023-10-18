import { useEffect, useState, useCallback, memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import WishListBox from "../components/Carousels/wistListBox";
import ExploreBooksBox from "../components/Carousels/exploreBooksBox";
import { useUserDispatch, useUserState } from "../context/context";
import {
  SET_USER,
  SET_WISHLIST,
  SET_WISHLIST_IDS,
  SET_LENDING_LIBRARY_IDS,
} from "../context/actions";
import { parse } from "cookie";

interface UserProp {
  email: string;
  id: string;
  username: string | null;
}

interface HomeProps {
  user: UserProp;
  wishlistData: any;
  wishlistIdsData: any;
  lendingLibraryIdsData: any;
}

const Home: React.FC<HomeProps> = memo(
  ({ user, wishlistData, wishlistIdsData, lendingLibraryIdsData }) => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useUserDispatch();

    const fetchUpdatedData = useCallback(async () => {
      try {
        const updatedWishlistResponse = await fetch(
          `/api/user/wishList/${user.id}`
        );
        const updatedWishlist = await updatedWishlistResponse.json();
        dispatch({ type: SET_WISHLIST, payload: updatedWishlist });

        const updatedLendingLibraryIDs = await fetch(
          `/api/user/lendingLibraryIDs/${user.id}`
        );
        const updatedLendingLibraryIDsData =
          await updatedLendingLibraryIDs.json();
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: updatedLendingLibraryIDsData,
        });

        setIsLoading(false);
      } catch (error) {
        handleError(error);
      }
    }, [dispatch, user.id]);

    useEffect(() => {
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_WISHLIST, payload: wishlistData });
      dispatch({ type: SET_WISHLIST_IDS, payload: wishlistIdsData });
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: lendingLibraryIdsData,
      });
    }, [dispatch, user, wishlistData, wishlistIdsData, lendingLibraryIdsData]);

    useEffect(() => {
      fetchUpdatedData();
    }, [fetchUpdatedData]);

    const handleError = useCallback((error) => {
      console.error(error);
      // Additional error handling logic
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
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
    );
  }
);

export const getServerSideProps = async (context) => {
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

  const [
    userResponse,
    wishlistResponse,
    wishlistIdsResponse,
    lendingLibraryIdsResponse,
  ] = await Promise.all([
    fetch(userUrl),
    fetch(wishlistUrl),
    fetch(wishlistIdsUrl),
    fetch(lendingLibraryIdsUrl),
  ]);

  const userData = await userResponse.json();
  const wishlistData = await wishlistResponse.json();
  const wishlistIdsData = await wishlistIdsResponse.json();
  const lendingLibraryIdsData = await lendingLibraryIdsResponse.json();

  return {
    props: {
      user: userData,
      wishlistData: wishlistData,
      wishlistIdsData: wishlistIdsData,
      lendingLibraryIdsData: lendingLibraryIdsData,
    },
  };
};

export default Home;
