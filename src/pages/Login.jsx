import CreateAccount from "../components/CreateAccount";
import LoginDiv from "../components/LoginDiv";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Login = () => {
  const hash = useLocation().hash;

  // 로그인 / 회원가입 페이지 경로
  const signPage = () => {
    if (hash === "#signup") return true;
    if (hash === "#login") return false;
  };

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
  width: 100%;
`;

const StUserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  border: none;
  border-radius: 30px;
`;
