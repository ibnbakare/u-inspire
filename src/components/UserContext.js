import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const UserContext = createContext();

// 2. Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 3. Define a function to update user data
  const updateUser = (userData) => setUser(userData);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. Create a custom hook to access the context
export const useUserContext = () => {
  return useContext(UserContext);
};
