import { useContext } from "react"
import { postContext } from "../contexts/PostContext"

const Main = () => {

  const { testList } = useContext(postContext);

  console.log("testList =>", testList);

  return (
    <>
      메인페이지
    </>
  )
}

export default Main
