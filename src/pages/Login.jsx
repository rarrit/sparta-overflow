import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { useEffect } from "react";
import supabase from "../services/supabaseClient";
import CreateAccount from "../components/CreateAccount";
import LoginDiv from "../components/LoginDiv";
import styled from "styled-components";

const Login = () => {
  const { setUsers } = useContext(dataContext);

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

  return (
    <UserInfoDiv>
      <UserInfoBox>{true ? <CreateAccount /> : <LoginDiv />}</UserInfoBox>
    </UserInfoDiv>
  );
};

export default Login;

const UserInfoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 600px;
  background-color: #f0fadc;
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: #eadf44;
  border: none;
  border-radius: 30px;
`;
