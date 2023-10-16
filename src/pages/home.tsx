import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import WishListBox from "../components/Carousels/wistListBox";
import ExploreBooksBox from "../components/Carousels/exploreBooksBox";
import { parse } from "cookie";

interface UserProp {
  email: string;
  id: string;
  username: string | null;
}

interface HomeProps {
  userProp: UserProp;
}

const Home: React.FC<HomeProps> = ({ userProp }) => {
  const [wishListBooks, setWishListBooks] = useState([]);
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/id/${userProp.id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container maxWidth="1500px">
      <Grid xs={2}>
        <h1>Yo</h1>
      </Grid>
      <Grid xs={10} minWidth="1000px">
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

        {wishListBooks.length > 0 && <WishListBox books={wishListBooks} />}
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async (context) => {
  // Extract the user cookie from the request headers
  const cookies = context.req.headers.cookie;
  const userCookie = cookies && parse(cookies).user;

  // If there's no user cookie, redirect to the login page
  if (!userCookie) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const userProp = JSON.parse(userCookie);

  return {
    props: {
      userProp: userProp, // Pass the parsed user object as a prop
    },
  };
};

export default Home;
