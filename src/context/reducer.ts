import { UserBooks, User, Books } from '@prisma/client';
import { SET_WISHLIST, SET_LENDING_LIBRARY, SET_LENDING_LIBRARY_IDS, SET_USER_BOOKS, SET_USER_BOOKS_IDS, SET_USER, SET_WISHLIST_IDS, SET_STAR_RATINGS, SET_IMAGE_URLS_OBJECT } from './actions';

interface ImageUrls {
  [key: string]: string;
}
interface StarRating {
  booksId: string;
  starRating: UserBooks["starRating"];
  ISBN10: Books["ISBN10"];
}
// Define the state type
interface HomeState {
  imageUrlsObj?: ImageUrls;
  user: User;
  wishList: Books[];
  lendingLibrary: Books[];
  lendingLibraryIDs: string[];
  userBooks: UserBooks[];
  userBooksIDs: string[];
  wishListIDs: string[];
  starRatings: StarRating[];
}

// Define the action type
type UserAction =
    { type: typeof SET_IMAGE_URLS_OBJECT; payload: ImageUrls}
  | { type: typeof SET_USER; payload: User }
  | { type: typeof SET_WISHLIST; payload: Books[] }
  | { type: typeof SET_LENDING_LIBRARY; payload: Books[] }
  | { type: typeof SET_LENDING_LIBRARY_IDS; payload: string[] }
  | { type: typeof SET_USER_BOOKS; payload: UserBooks[] }
  | { type: typeof SET_USER_BOOKS_IDS; payload: string[] }
  | { type: typeof SET_WISHLIST_IDS; payload: string[] }
  | { type: typeof SET_STAR_RATINGS; payload: StarRating[] };

function userReducer(state: HomeState, action: UserAction): HomeState {
  switch (action.type) {
    case SET_IMAGE_URLS_OBJECT:
      return { ...state, imageUrlsObj: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_WISHLIST:
      return { ...state, wishList: action.payload };
    case SET_LENDING_LIBRARY:
      return { ...state, lendingLibrary: action.payload };
    case SET_LENDING_LIBRARY_IDS:
      return { ...state, lendingLibraryIDs: action.payload };
    case SET_USER_BOOKS:
      return { ...state, userBooks: action.payload };
    case SET_USER_BOOKS_IDS:
      return { ...state, userBooksIDs: action.payload };
    case SET_WISHLIST_IDS:
      return { ...state, wishListIDs: action.payload };
    case SET_STAR_RATINGS:
      return { ...state, starRatings: action.payload };
    default:
      return state;
  }
}

export default userReducer;
