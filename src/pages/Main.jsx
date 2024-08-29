import { useContext } from "react";
import { postContext } from "../contexts/PostContext";
const Main = () => {
  // context Test
  const { testList, addTestListHandler, loginUser } = useContext(postContext);
  console.log("testList =>", testList);
  console.log("user", loginUser);

  return (
    <>
      메인페이지
      <button onClick={addTestListHandler}>테스트 </button>
    </>
  );
};

export default Main;
