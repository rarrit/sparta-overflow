import { StUserInfoButton, StUserInfoInput, StUserInfoName } from "./LoginDiv";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { useContext, useState } from "react";
import { dataContext } from "../contexts/DataContext";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [signUpId, setSignUpId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { users } = useContext(dataContext);

  // 회원가입 함수
  const signUpHandler = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: signUpId,
      password,
    });
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", data.user);
      // 회원가입 시 자동으로 로그인 됨
      console.log("로그인 =>", data.user.id);
      signUpPlusHandler(data.user.id);
    }
  };
  // 사용자 정보 업데이트 함수
  const signUpPlusHandler = async (id) => {
    const { error } = await supabase
      .from("userinfo")
      .update({
        password: password,
        username: userName,
        profileImage: profileImage,
      })
      .eq("id", id);
    if (error) {
      console.log("사용자정보업데이트에러", error);
    }
  };
  // 회원가입 로직 실행 함수
  const SignUp = () => {
    const findEmail = users.find((user) => user.email === signUpId);
    if (!findEmail && password.length > 5) {
      signUpHandler();
      // signUpPlusHandler();
      alert("회원가입되었습니다");
      navigate("/");
    } else {
      alert("이미 가입한 이메일이거나 패스워드의 길이가 부족합니다");
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
      <StLowDiv>
        <StUserInfoName>이름</StUserInfoName>
        <StUserInfoInput
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ width: "300px" }}
          placeholder="사용자 이름을 입력해주세요"
        />
      </StLowDiv>
      <StLowDiv>
        <StUserInfoName>이미지</StUserInfoName>
        <StUserInfoInput
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          style={{ width: "300px" }}
          placeholder="사용자 이미지를 입력해주세요"
        />
      </StLowDiv>
      <StUserInfoButton
        onClick={() => {
          SignUp();
        }}
      >
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
