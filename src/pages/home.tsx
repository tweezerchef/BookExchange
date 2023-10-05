import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import WishListBox from "../components/Carousels/wistListBox";
import { parse } from "cookie";

const Home: React.FC = () => {
  const [wishListBooks, setWishListBooks] = useState([]);

  return (
    <Grid container>
      <Grid xs={3}>
        <h1>Yo</h1>
      </Grid>
      <Grid xs={9}>
        <Box
          sx={{
            width: "100%",
            height: "200px",
            backgroundImage: "url(https://i.imgur.com/oB9cYCo.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

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

  // If there's a user cookie, continue to render the home page
  return {
    props: {}, // you can pass some props to the page component if needed
  };
};

export default Home;
