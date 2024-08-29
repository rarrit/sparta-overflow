import { useContext } from "react"
import { dataContext } from "../contexts/DataContext"
import { useEffect } from "react";
import supabase from "../services/supabaseClient";

const SupaBaseExample = () => {
  // [1] useContext 를 사용해서 Supabase의 테이블의 상태값을 가져옵니다.
  const {users, setUsers, posts} = useContext(dataContext);

  // [2] useEffect를 사용하여, 아래 걍 가져다 쓰셍
  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from("Users").select("*");
      if(error) {
        console.log("error =>", error);
      }else{
        console.log("user data =>", data);

        // [3] 잘 연결되었을 때 여기서 로직을 작성합니다.
        setUsers(data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      로그인 페이지
    </>
  )
}

export default SupaBaseExample
