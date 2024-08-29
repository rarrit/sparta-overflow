import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { dataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const LoginDiv = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, ChangeLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const { users } = useContext(dataContext);

  const onLogin = () => {
    for (const user of users) {
      // console.log(user["\bemail"]);
      if (loginId !== user["\bemail"]) {
        alert("아이디가 일치하지 않습니다");
        break;
      } else if (password !== user.password) {
        alert("비밀번호가 일치하지 않습니다");
        break;
      } else {
        ChangeLogin(true);

        break;
      }
    }
  };

  return (
    <div>
      <InfoName>ID</InfoName>
      <Input
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="아이디나 이메일을 입력해주세요"
      />
      <InfoName>PW</InfoName>
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
      <Button onClick={() => onLogin()}>로그인하기</Button>
    </div>
  );
};

export default LoginDiv;

const InfoName = styled.p`
  font-size: 30px;
  font-weight: 700;

  margin-top: 50px;
`;

const Input = styled.input`
  width: 400px;
  margin: 10px;
  padding: 10px;
  background-color: wheat;
  border-radius: 30px;
`;

const Button = styled.button`
  width: 100px;
  margin-top: 50px;
  padding: 10px;
  background-color: #e68b3c;
  border-radius: 30px;
  &:hover {
    background-color: #cb7327;
  }
`;
