import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  SET_WISHLIST,
  SET_LENDING_LIBRARY,
  SET_USER_BOOKS,
  SET_USER_BOOKS_IDS,
  SET_WISHLIST_IDS,
} from "./actions";

interface UserState {
  wishList?: any[]; // Replace any with the appropriate type
  wishListIDs?: any[]; // Replace any with the appropriate type
  lendingLibrary?: any[]; // Replace any with the appropriate type
  userBooks?: any[]; // Replace any with the appropriate type
  userBooksIDs?: any[]; // Replace any with the appropriate type
  user: any;
}

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<React.Dispatch<any> | undefined>(
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

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    wishList: [],
    lendingLibrary: [],
    userBooks: [],
    userBooksIDs: [],
    wishListIDs: [],
    user: {},
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
