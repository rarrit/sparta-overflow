import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { dataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";

const LoginDiv = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLogin } = useContext(dataContext);

  // 로그인 상태가 변경되면 홈으로 이동
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  // 로그인 함수
  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginId,
      password: password,
    });
    if (error) {
      alert("입력정보가 올바르지 않습니다");
    } else {
      console.log("로그인 =>", data);
    }
  };

  const onLogin = () => {
    signInWithEmail();
  };

  return (
    <div>
      <StUserInfoName>ID</StUserInfoName>
      <StUserInfoInput
        value={String(loginId)}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="아이디나 이메일을 입력해주세요"
      />
      <StUserInfoName>PW</StUserInfoName>
      <StUserInfoInput
        value={String(password)}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
      <StUserInfoButton onClick={() => onLogin()}>로그인하기</StUserInfoButton>
    </div>
  );
};

export default LoginDiv;

export const StUserInfoName = styled.p`
  font-size: 30px;
  font-weight: 700;

  margin: 10px;
`;

export const StUserInfoInput = styled.input`
  width: 400px;
  margin: 10px;
  padding: 10px;
  background-color: wheat;
  border-radius: 30px;
`;

export const StUserInfoButton = styled.button`
  width: 100px;
  margin-top: 50px;
  padding: 10px;
  background-color: #e68b3c;
  border-radius: 30px;
  &:hover {
    background-color: #cb7327;
  }
`;
