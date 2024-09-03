import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";

const LoginDiv = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // 로그인 함수
  const signInWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginId,
      password: password,
    });
    if (error) {
      alert("입력정보가 올바르지 않습니다");
    } else {
      navigate("/");
    }
  };

  const EnterLogin = (key) => {
    if (key === "Enter") {
      signInWithEmail();
    }
  };

  return (
    <StSignDiv>
      <StUserInfoTitle>LOGIN</StUserInfoTitle>
      <StLoginBoxDiv>
        <StUserInfoInput
          value={String(loginId)}
          onChange={(e) => setLoginId(e.target.value)}
          onKeyDown={(e) => EnterLogin(e.key)}
          placeholder="아이디나 이메일을 입력해주세요"
        />
        <StUserInfoInput
          value={String(password)}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => EnterLogin(e.key)}
          placeholder="비밀번호를 입력해주세요"
        />
        <StBtnDiv>
          <StBlackButton
            onClick={() => {
              signInWithEmail();
            }}
          >
            로그인
          </StBlackButton>
          <StUserInfoButton onClick={() => navigate("/sign#signup")}>
            회원가입
          </StUserInfoButton>
        </StBtnDiv>
      </StLoginBoxDiv>
    </StSignDiv>
  );
};

export default LoginDiv;

export const StSignDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 50px;
`;

export const StUserInfoTitle = styled.p`
  font-size: 60px;
  font-weight: 700;

  margin: 30px auto;
`;

export const StLoginBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  border-radius: 15px;
  width: 100%;
  padding: 40px;
`;

export const StUserInfoInput = styled.input`
  width: 100%;
  height: 70px;
  margin: 5px auto;
  padding: 20px;
  border: 3px solid black;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;
  color: #9e9c9c;
  &:focus {
    color: black;
  }
`;

export const StBtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const StUserInfoButton = styled.button`
  width: 100%;
  padding: 15px;
  margin: 5px;
  border: 3px solid black;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

export const StBlackButton = styled(StUserInfoButton)`
  background-color: black;
  color: white;
`;
