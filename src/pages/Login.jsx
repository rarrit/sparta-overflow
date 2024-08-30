import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { useEffect } from "react";
import supabase from "../services/supabaseClient";
import CreateAccount from "../components/CreateAccount";
import LoginDiv from "../components/LoginDiv";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { setUsers } = useContext(dataContext);
  const hash = useLocation().hash;

  const signPage = () => {
    if (hash === "#signup") return true;
    if (hash === "#login") return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("userinfo").select("*");
      if (error) {
        console.log("user data error =>", error);
      } else {
        console.log("user data =>", data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  return (
    <StUserInfoDiv>
      <StUserInfoBox>
        {signPage() ? <CreateAccount /> : <LoginDiv />}
      </StUserInfoBox>
    </StUserInfoDiv>
  );
};

export default Login;

const StUserInfoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 600px;
  background-color: #f0fadc;
`;

const StUserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: #eadf44;
  border: none;
  border-radius: 30px;
`;
