import styled from "styled-components";
import { useState, useEffect, createContext, useContext } from "react";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";
import ProfileInfo from "../components/ProfileInfo";
import MypageTab from "../components/MypageTab";
import GoBack from "../components/GoBack";

export const MypageDataContext = createContext();

const Mypage = () => {
  const { loginUserInfo } = useContext(dataContext); //로그인한 user정보
  const [profile, setProfile] = useState([]); //로그인한 유저정보 저장
  const [posts, setPosts] = useState([]); //포스트 정보 저장
  const [allComment, setAllComment] = useState([]); //답변 전체데이터 저장
  const [comment, setComment] = useState([]); //답변 정보 저장

  const loginUserInfoId = loginUserInfo.id;

  //전체코멘트중 내 코멘트 필터링
  const findMyComment = (allComment, loginUserInfoId) => {
    return allComment.filter((data) => data.writerUserId === loginUserInfoId);
  };
  const myComment = findMyComment(allComment, loginUserInfoId);

  //NOTE - 수퍼베이스 데이터 가져오기
  //답변테이블 : 답변데이터 전체 + Post테이블 같이 붙여서 가져오기
  useEffect(() => {
    const fetchComment = async () => {
      const { data, error } = await supabase
        .from("Comment")
        .select("*, Post (*)");
      if (error) {
        console.error("ErrorError :", error);
      } else {
        setAllComment(data);
      }
    };
    fetchComment();
  }, [comment]);

  //유저정보테이블 : 로그인한계정의 이메일과 같은 행 찾기
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("userinfo")
        .select("*")
        .eq("email", loginUserInfo.email);

      if (error) {
        console.error("ErrorError :", error);
      } else {
        setProfile(data);
      }
    };
    fetchProfile();
  }, [loginUserInfo]);

  //유저의 포스팅정보 테이블 : 로그인한계정의 아이디와 같은 행 찾기
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("userId", loginUserInfo.id);

      if (error) {
        console.error("ErrorError :", error);
      } else {
        setPosts(data);
      }
    };
    fetchPost();
  }, [loginUserInfo]);

  return (
    <MypageDataContext.Provider
      value={{
        loginUserInfo,
        profile,
        setProfile,
        posts,
        setPosts,
        comment,
        setComment,
        myComment,
        loginUserInfoId,
      }}
    >
      <GoBack />
      <StMypageContainer>
        <section>
          <ProfileInfo />
        </section>
        <section>
          <MypageTab />
        </section>
      </StMypageContainer>
    </MypageDataContext.Provider>
  );
};

export default Mypage;

const StMypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 20px 0 100px 0;
  width: 100%;
  margin: 0 auto;
`;
