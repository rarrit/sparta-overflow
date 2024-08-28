import { useState } from "react";
import { createContext } from "react";

export const postContext = createContext();
export const PostProvider = ({ children }) => {
  const [testList, setTestList] = useState([]);

  const addTestListHandler = () => {
    console.log("함수 테스트");
  }

  return(
    <postContext.Provider value={{
      testList,
      setTestList
    }}>
      {children}
    </postContext.Provider>
  )
}