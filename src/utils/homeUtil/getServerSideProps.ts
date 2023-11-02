import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { User, Books, UserBooks } from '@prisma/client';
import * as signature from 'cookie-signature';
import Image from 'next/image';
import { getSignedURL } from '../getSignedURL';

interface StarRating {
  booksId: string;
  starRating: UserBooks['starRating'];
}
  interface UserProp {
    id: string;
    name: string;
    email: string;
  }
  type Data = [
    User | null,
    Books[] | null,
    Books["id"][] | null,
    Books["id"][] | null,
    StarRating[] | null
  ];
  interface ImageUrls {
    [key: string]: string;
  }



  interface HomeProps {
    imageUrlsObject: ImageUrls;
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


    // need to try to figure out loading of carousels pre render
    const userProp: UserProp = JSON.parse(unsignedValue) as UserProp;
    const baseUrl = req ? `http://${req.headers.host}` : "";
    const userId = userProp.id;
    const genreNames = [
      "actionBook", "comedyBook", "dramaBook", "horrorBook", "romanceBook",
      "thrillerBook", "sciFIBook", "mysteryBook", "fantasyBook", "historyBook",
      "westernBook", "nonFictionBook", "fictionBook", "childrensBook",
      "cookingBook", "selfHelpBook", "travelBook", "spiritualityBook",
    ];
    const backgroundImageFile = "TopBanner.png";
    const filePaths = [...genreNames.map(name => `icons/${name}.png`)];

let imageUrlsObject: ImageUrls = {};
try {
  const validFilePaths = filePaths.filter(filePath => filePath && typeof filePath === 'string' && filePath.length > 0);
  const imageUrls = await Promise.all(validFilePaths.map(async filePath => {
    const url = await getSignedURL(filePath);
    return { [filePath]: url };
  }));

  imageUrlsObject = Object.assign({}, ...imageUrls) as ImageUrls;
    } catch (err) {
      console.error('Error fetching signed URLs: ', err);
    }
    let randomBooks: Books[] = [];
    try {
      const res = await fetch(`${baseUrl}/api/bookDB/randomBooks`);
      randomBooks = await res.json() as Books[];
    } catch (error) {
      console.error("Error fetching random books:", error);
    }
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
      responses.map(async (response, index) => {
        if (response.status === "fulfilled") {
          return response.value.json();
        }
        // Provide default values based on the expected type of each API call
        switch (index) {
          case 0: return null; // User | null
          case 1: return [];   // Books[] | null
          case 2: return [];   // Books["id"][] | null
          case 3: return [];   // Books["id"][] | null
          case 4: return [];   // StarRating[] | null
          default: return null;
        }
      })
    ) as Data;

    const [
      user,
      wishlistData,
      wishlistIdsData,
      lendingLibraryIdsData,
      starRatingData,
    ] = data;
    return {
      props: {
        randomBooks,
        imageUrlsObject,
        user,
        wishlistData,
        wishlistIdsData,
        lendingLibraryIdsData,
        starRatingData,
      },
    };
  };