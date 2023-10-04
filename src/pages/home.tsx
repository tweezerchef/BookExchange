import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import WishListBox from "../components/Carousels/wistListBox";

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

export default Home;
