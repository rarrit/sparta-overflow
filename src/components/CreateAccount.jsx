import React from "react";
import { UserInfoButton, UserInfoInput, UserInfoName } from "./LoginDiv";
import styled from "styled-components";

const CreateAccount = () => {
  return (
    <div>
      <LowDiv>
        <UserInfoName>ID</UserInfoName>
        <UserInfoInput
          style={{ width: "300px" }}
          placeholder="아이디나 이메일을 입력해주세요"
        />
      </LowDiv>
      <UserInfoButton>가입하기</UserInfoButton>
    </div>
  );
};

export default CreateAccount;

const LowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
