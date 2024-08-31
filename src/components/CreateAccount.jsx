import { StUserInfoButton, StUserInfoInput, StUserInfoName } from "./LoginDiv";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { useState } from "react";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [signUpId, setSignUpId] = useState("");
  const [password, setPassword] = useState("");

  const signUpHandler = async () => {
    await supabase.auth.signUp({
      signUpId,
      password,
    });
  };

  return (
    <div>
      <StLowDiv>
        <StUserInfoName>ID</StUserInfoName>
        <StUserInfoInput
          value={signUpId}
          style={{ width: "300px" }}
          placeholder="아이디나 이메일을 입력해주세요"
        />
      </StLowDiv>
      <StUserInfoButton>가입하기</StUserInfoButton>
      <StUserInfoButton onClick={() => navigate("/sign#login")}>
        로그인하러 가기
      </StUserInfoButton>
    </div>
  );
};

export default CreateAccount;

const StLowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
