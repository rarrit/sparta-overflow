import { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/ProfileInfo";
import MypageTab from "../components/MypageTab";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";

export const mypageDataContext = createContext();

const CommendMockData = [
  {
    created_at: "2024-08-30T06:38:33.417543+00:00",
    email: "test@test.com",
    id: "beea1b96-b9dc-402f-a8a1-7b6ee95f1f1a",
    password: null,
    profileImage:
      "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png",
    username: "홍길",
  },
];

const Mypage = () => {
  const { loginUserInfo, comments } = useContext(dataContext); //로그인한 user정보
  const [profile, setProfile] = useState([]); //로그인한 유저정보 저장
  const [posts, setPosts] = useState([]); //포스트 정보 저장
  const [comment, setComment] = useState([]); //답변 정보 저장

  console.log("로그인유저데이터_확인", loginUserInfo);
  console.log("커멘드데이터_확인", CommendMockData);

  //NOTE - 수퍼베이스 데이터 가져오기
  useEffect(() => {
    const fetchComment = async () => {
      const { data, error } = await supabase
        .from("Comment")
        .select("*")
        .eq("writerUserId", CommendMockData.id);
      if (error) {
        console.error("ErrorError :", error);
      } else {
        console.log("커멘트 데이터:", data);
        setComment(data);
      }
    };
    fetchComment();
  }, []);

  //유저정보테이블 : 로그인한계정의 이메일과 같은 열 찾기
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("userinfo")
        .select("*")
        .eq("email", loginUserInfo.email); //

      if (error) {
        console.error("ErrorError :", error);
      } else {
        // console.log("로그인 유저 데이터:", data);
        setProfile(data);
      }
    };
    fetchProfile();
  }, [loginUserInfo]);
  /*
  지울예정)
  supabase.from("userinfo") : supabase에서 가져올 테이블명 지정
  .select("*") : 가져온테이블의 전체내용
  .eq('해당테이블열값 중 하나', 'text') : 열이 동일한 경우 결과를 필터링
  */

  //유저의 포스팅정보 테이블 : 로그인한계정의 아이디와 같은 열 찾기
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("userId", loginUserInfo.id); //

      if (error) {
        console.error("ErrorError :", error);
      } else {
        // console.log("로그인한 유저의 포스팅데이터:", data);
        setPosts(data);
      }
    };
    fetchPost();
  }, [loginUserInfo]);

  return (
    <mypageDataContext.Provider
      value={{
        loginUserInfo,
        profile,
        setProfile,
        posts,
        setPosts,
        comment,
        setComment,
      }}
    >
      <StMypageContainer>
        <section>
          <ProfileInfo />
        </section>
        <section>
          <MypageTab />
        </section>
      </StMypageContainer>
    </mypageDataContext.Provider>
  );
};

export default Mypage;

const StMypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1060px;
  width: 100%;
  border: 1px solid;
  margin: 0 auto;
`;
