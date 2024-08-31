import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";

const LoginDiv = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { users, setLoginUserInfo } = useContext(dataContext);

  // 로그인 함수
  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginId,
      password: password,
    });
    if (error) {
      alert("입력정보가 올바르지 않습니다");
    } else {
      console.log("로그인 =>", data.user);
      const selectLoginUserInfo = users.filter(
        (user) => user.id === data.user.id
      );
      console.log("사용자정보=>", ...selectLoginUserInfo);
      setLoginUserInfo(...selectLoginUserInfo);
    }
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
      <StUserInfoButton
        onClick={() => {
          signInWithEmail();
          navigate("/");
        }}
      >
        로그인하기
      </StUserInfoButton>
      <StUserInfoButton onClick={() => navigate("/sign#signup")}>
        회원가입하러 가기
      </StUserInfoButton>
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
