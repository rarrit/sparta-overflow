import {
  StBlackButton,
  StBtnDiv,
  StLoginBoxDiv,
  StSignDiv,
  StUserInfoButton,
  StUserInfoInput,
  StUserInfoTitle,
} from "./LoginDiv";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { useEffect, useState } from "react";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [signUpId, setSignUpId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("익명");
  const [usingEmail, setUsingEmail] = useState([]);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2018/01/12/16/31/spoon-3078582_640.png";
  const [profileImage, setProfileImage] = useState(defaultImage);

  // 이미 사용되고 있는 이메일
  const fetchData = async () => {
    const { data, error } = await supabase.from("userinfo").select("email");
    if (error) {
    } else {
      setUsingEmail(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 회원가입 함수
  const signUpHandler = async () => {
    const { data } = await supabase.auth.signUp({
      email: signUpId,
      password,
    });
    // 사용자 정보 업데이트 함수
    const { error } = await supabase
      .from("userinfo")
      .update({
        password: password,
        username: userName,
        profileImage: profileImage,
      })
      .eq("id", data.user.id);
    // 회원가입 시 자동으로 로그인 됨
  };
  const correctEmail = usingEmail.some((using) => {
    return using.email === signUpId;
  });
  // 회원가입 로직 실행 함수
  const SignUp = () => {
    if (!correctEmail && password.length > 5) {
      signUpHandler();
      alert("회원가입되었습니다");
      navigate("/");
    } else {
      alert("이메일이 이미 사용되고 있거나 패스워드의 길이가 부족합니다");
    }
  };

  return (
    <StSignDiv>
      <StUserInfoTitle>JOIN</StUserInfoTitle>
      <StLoginBoxDiv>
        <StUserInfoName>프로필 이미지</StUserInfoName>
        <img
          src={profileImage}
          onClick={() => {
            let promptInput = prompt(
              "이미지 URL을 입력해주세요",
              `${profileImage}`
            );
            setProfileImage(promptInput ?? defaultImage);
          }}
          alt="프로필이미지"
        />
        <StUserInfoName>ID</StUserInfoName>
        <StUserInfoInput
          value={signUpId}
          onChange={(e) => setSignUpId(e.target.value)}
          placeholder="아이디나 이메일을 입력해주세요"
        />

        <StUserInfoName>PW</StUserInfoName>
        <StUserInfoInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="패스워드를 입력해주세요"
        />

        <StUserInfoName>이름</StUserInfoName>
        <StUserInfoInput
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="사용자 이름을 입력해주세요"
        />

        <StBtnDiv>
          <StBlackButton
            onClick={() => {
              SignUp();
            }}
          >
            가입하기
          </StBlackButton>
          <StUserInfoButton onClick={() => navigate("/sign#login")}>
            로그인
          </StUserInfoButton>
        </StBtnDiv>
      </StLoginBoxDiv>
    </StSignDiv>
  );
};

export default CreateAccount;

const StUserInfoName = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin-top: 10px;
`;
