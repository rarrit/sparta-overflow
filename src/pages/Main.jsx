import { useContext } from "react"
import { postContext } from "../contexts/PostContext"
const Main = () => {

  // context Test
  const { testList, addTestListHandler } = useContext(postContext);
  console.log("testList =>", testList);

  return (
    <>
      메인페이지
      <button onClick={addTestListHandler}>테스트 </button>
    </>
  )
}

export default Main
