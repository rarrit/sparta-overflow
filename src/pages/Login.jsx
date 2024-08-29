import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { useEffect } from "react";
import supabase from "../services/supabaseClient";
import CreateAccount from "../components/CreateAccount";
import LoginDiv from "../components/LoginDiv";

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

  return <>{true ? <LoginDiv /> : <CreateAccount />}</>;
};

export default Login;
