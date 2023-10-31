import { createContext, useContext, useReducer } from "react";
import { UserBooks, User, Books } from "@prisma/client";
import reducer from "./reducer";

interface ImageUrls {
  [key: string]: string;
}

interface HomeState {
  imageUrlsObj?: ImageUrls;
  wishList?: Books[];
  wishListIDs?: Books["id"][];
  lendingLibrary?: Books[];
  lendingLibraryIDs?: Books["id"][];
  userBooks?: UserBooks[];
  userBooksIDs?: Books["id"][];
  starRatings?: UserBooks[];
  user?: User;
}

const HomeStateContext = createContext<HomeState | undefined>(undefined);
const HomeDispatchContext = createContext<React.Dispatch<unknown> | undefined>(
  undefined
);

export const useHomeState = () => {
  const context = useContext(HomeStateContext);
  if (!context) {
    throw new Error("useHomeState must be used within a UserProvider");
  }
  return context;
};

export const useHomeDispatch = () => {
  const context = useContext(HomeDispatchContext);
  if (!context) {
    throw new Error("useHomeDispatch must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [state, dispatch] = useReducer(reducer, {
    imageUrlsObj: {} as ImageUrls,
    wishList: [] as Books[],
    lendingLibrary: [] as Books[],
    lendingLibraryIDs: [] as Books["id"][],
    userBooks: [] as UserBooks[],
    userBooksIDs: [] as Books["id"][],
    wishListIDs: [] as Books["id"][],
    starRatings: [] as UserBooks[],
    user: {} as User,
  });

  return (
    <HomeStateContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        {children}
      </HomeDispatchContext.Provider>
    </HomeStateContext.Provider>
  );
}
