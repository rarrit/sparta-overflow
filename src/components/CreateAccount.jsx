import { StUserInfoButton, StUserInfoInput, StUserInfoName } from "./LoginDiv";
import styled from "styled-components";
import supabase from "../services/supabaseClient";

const CreateAccount = () => {
  // 테스트를 위한 임시 기능
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("로그아웃이 실패했습니다");
  };

  return (
    <div>
      <StLowDiv>
        <StUserInfoName>ID</StUserInfoName>
        <StUserInfoInput
          style={{ width: "300px" }}
          placeholder="아이디나 이메일을 입력해주세요"
        />
      </StLowDiv>
      <StUserInfoButton>가입하기</StUserInfoButton>
      <StUserInfoButton onClick={() => logout()}>로그아웃하기</StUserInfoButton>
    </div>
  );
};

export default CreateAccount;

const StLowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
