import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import WishListBox from "../components/Carousels/wistListBox";
import ExploreBooksBox from "../components/Carousels/exploreBooksBox";
import { parse } from "cookie";

const Home: React.FC<{ user: string }> = ({ user }) => {
  const [wishListBooks, setWishListBooks] = useState([]);
  //write a function that logs "user" from local storage
  // const user = localStorage.getItem("user");
  console.log(user);
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
            backgroundImage: "url(https://i.imgur.com/oB9cYCo.png)",
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

  // If there's a user cookie, continue to render the home page
  return {
    props: {
      user: userCookie, // Pass the userCookie as a prop
    },
  };
};

export default Home;
