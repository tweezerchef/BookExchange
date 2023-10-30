import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { User, Books } from '@prisma/client';
import * as signature from 'cookie-signature';

interface StarRating {
    bookID: string;
    rating: number;
  }
  interface UserProp {
    id: string;
    name: string;
    email: string;
  }

  interface HomeProps {
    user: User;
    wishlistData: Books[];
    wishlistIdsData: Books['id'][];
    lendingLibraryIdsData: Books['id'][];
    starRatingData: StarRating[];
  }
  const secretKey = process.env.SECRET_COOKIE_KEY;

  export const getServerSideProps: GetServerSideProps<HomeProps> = async (
    context
  ) => {
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
    const unsignedValue = signature.unsign(userCookie, secretKey)
    if (unsignedValue === false) {
      // Signature validation failed, cookie has been tampered with
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const userProp: UserProp = JSON.parse(unsignedValue) as UserProp;
    const baseUrl = req ? `http://${req.headers.host}` : "";
    const userId = userProp.id;

    const urls = {
      user: `${baseUrl}/api/user/id/${userId}`,
      wishlist: `${baseUrl}/api/user/wishList/${userId}`,
      wishlistIds: `${baseUrl}/api/user/wishListIDs/${userId}`,
      lendingLibraryIds: `${baseUrl}/api/user/lendingLibraryIDs/${userId}`,
      starRating: `${baseUrl}/api/user/starRating/${userId}`,
    };

    const headers = {
      Cookie: cookies // Attach the cookies to the request
    };

    const responses = await Promise.allSettled(
      Object.values(urls).map((url) =>
        fetch(url, { headers }) // Pass the headers to fetch
      )
    );

    const data: [
      User | null,
      Books[] | null,
      Books["id"][] | null,
      Books["id"][] | null,
      StarRating[] | null,
    ] = await Promise.all(
      responses.map(async (response) => {
        if (response.status === "fulfilled") {
          return response.value.json();
        }
        // Handle error or unavailable API here
        return null;
      })
    );

    const [
      user,
      wishlistData,
      wishlistIdsData,
      lendingLibraryIdsData,
      starRatingData,
    ] = data;

    return {
      props: {
        user,
        wishlistData,
        wishlistIdsData,
        lendingLibraryIdsData,
        starRatingData,
      },
    };
  };