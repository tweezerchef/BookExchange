import { SET_WISHLIST, SET_LENDING_LIBRARY, SET_USER_BOOKS, SET_USER_BOOKS_IDS, SET_WISHLIST_IDS } from './actions';

function userReducer(state, action) {
  switch (action.type) {
    case SET_WISHLIST:
      return { ...state, wishList: action.payload };
    case SET_LENDING_LIBRARY:
      return { ...state, lendingLibrary: action.payload };
    case SET_USER_BOOKS:
      return { ...state, userBooks: action.payload };
    case SET_USER_BOOKS_IDS:
      return { ...state, userBooksIDs: action.payload };
    case SET_WISHLIST_IDS:
      return { ...state, wishListIds: action.payload };
    default:
      return state;
  }
}

export default userReducer;
