import { UserBooks } from '@prisma/client';
import { SET_WISHLIST, SET_LENDING_LIBRARY, SET_LENDING_LIBRARY_IDS, SET_USER_BOOKS, SET_USER_BOOKS_IDS, SET_USER, SET_WISHLIST_IDS, SET_STAR_RATINGS } from './actions';

// Define the state type
interface UserState {
  user: User;
  wishList: Book[];
  lendingLibrary: Book[];
  lendingLibraryIDs: string[];
  userBooks: UserBooks[];
  userBooksIDs: string[];
  wishListIDs: string[];
  starRatings: UserBooks[];
}

// Define the action type
type UserAction =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof SET_WISHLIST; payload: Book[] }
  | { type: typeof SET_LENDING_LIBRARY; payload: Book[] }
  | { type: typeof SET_LENDING_LIBRARY_IDS; payload: string[] }
  | { type: typeof SET_USER_BOOKS; payload: UserBooks[] }
  | { type: typeof SET_USER_BOOKS_IDS; payload: string[] }
  | { type: typeof SET_WISHLIST_IDS; payload: string[] }
  | { type: typeof SET_STAR_RATINGS; payload: UserBooks[] };

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
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
