import { useState, useEffect } from "react";
import { createContext } from "react";

export const dataContext = createContext();
export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loginUser, setLoginUser] = useState([]);

  console.log(loginUser);

  return (
    <dataContext.Provider
      value={{
        users,
        setUsers,
        posts,
        setPosts,
        comments,
        setComments,
        loginUser,
        setLoginUser,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
