import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { dataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";

const LoginDiv = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, ChangeLogin] = useState(false);
  const navigate = useNavigate();

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginId,
      password: password,
    });
    if (error) {
      console.log("error =>", error);
    } else {
      console.log("로그인 =>", data);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const { users } = useContext(dataContext);

  const onLogin = () => {
    let correctUser = false;
    for (const user of users) {
      if (loginId === user.email && password === user.password) {
        correctUser = true;
      }
    }
    if (!correctUser) {
      alert("입력정보가 일치하지 않습니다");
    } else {
      signInWithEmail();
      ChangeLogin(true);
    }
  };

  return (
    <div>
      <UserInfoName>ID</UserInfoName>
      <UserInfoInput
        value={String(loginId)}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="아이디나 이메일을 입력해주세요"
      />
      <UserInfoName>PW</UserInfoName>
      <UserInfoInput
        value={String(password)}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
      <UserInfoButton onClick={() => onLogin()}>로그인하기</UserInfoButton>
    </div>
  );
};

export default LoginDiv;

export const UserInfoName = styled.p`
  font-size: 30px;
  font-weight: 700;

  margin: 10px;
`;

export const UserInfoInput = styled.input`
  width: 400px;
  margin: 10px;
  padding: 10px;
  background-color: wheat;
  border-radius: 30px;
`;

export const UserInfoButton = styled.button`
  width: 100px;
  margin-top: 50px;
  padding: 10px;
  background-color: #e68b3c;
  border-radius: 30px;
  &:hover {
    background-color: #cb7327;
  }
`;
