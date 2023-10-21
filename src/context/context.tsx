import { createContext, useContext, useReducer } from "react";
import { UserBooks, User } from "@prisma/client";
import reducer from "./reducer";
import {
  SET_WISHLIST,
  SET_LENDING_LIBRARY,
  SET_LENDING_LIBRARY_IDS,
  SET_USER_BOOKS,
  SET_USER_BOOKS_IDS,
  SET_WISHLIST_IDS,
  SET_STAR_RATINGS,
} from "./actions";

interface UserState {
  wishList?: Book[];
  wishListIDs?: Book["id"][];
  lendingLibrary?: Book[];
  lendingLibraryIDs?: Book["id"][];
  userBooks?: UserBooks[];
  userBooksIDs?: Book["id"][];
  starRatings?: UserBooks[];
  user?: User;
}

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<React.Dispatch<unknown> | undefined>(
  undefined
);

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [state, dispatch] = useReducer(reducer, {
    wishList: [] as Book[],
    lendingLibrary: [] as Book[],
    lendingLibraryIDs: [] as Book["id"][],
    userBooks: [] as UserBooks[],
    userBooksIDs: [] as Book["id"][],
    wishListIDs: [] as Book["id"][],
    starRatings: [] as UserBooks[],
    user: {} as User,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}
