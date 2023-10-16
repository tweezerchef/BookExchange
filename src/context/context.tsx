import { createContext, useContext, useState } from "react";

// Create a context for the user data
const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [lendingLibrary, setLendingLibrary] = useState([]);
  const [userBooks, setUserBooks] = useState([]);

  return (
    <UserContext.Provider
      value={{
        wishList,
        setWishList,
        lendingLibrary,
        setLendingLibrary,
        userBooks,
        setUserBooks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
