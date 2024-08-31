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
    const { data, error } = await supabase.auth.signUp({
      email: signUpId,
      password,
    });
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data);
    }
  };

  return (
    <div>
      <StLowDiv>
        <StUserInfoName>ID</StUserInfoName>
        <StUserInfoInput
          value={signUpId}
          onChange={(e) => setSignUpId(e.target.value)}
          style={{ width: "300px" }}
          placeholder="아이디나 이메일을 입력해주세요"
        />
      </StLowDiv>
      <StLowDiv>
        <StUserInfoName>PW</StUserInfoName>
        <StUserInfoInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "300px" }}
          placeholder="패스워드를 입력해주세요"
        />
      </StLowDiv>
      <StUserInfoButton onClick={() => signUpHandler()}>
        가입하기
      </StUserInfoButton>
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
