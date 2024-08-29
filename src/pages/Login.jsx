import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { useEffect } from "react";
import supabase from "../services/supabaseClient";

const Login = () => {
  const { users, setUsers, posts } = useContext(dataContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Users").select("*");
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("user data =>", data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  return <>로그인 페이지</>;
};

export default Login;
