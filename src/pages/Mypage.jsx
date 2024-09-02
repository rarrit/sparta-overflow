import { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/ProfileInfo";
import MypageTab from "../components/MypageTab";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";

export const mypageDataContext = createContext();

const Mypage = () => {
  const { loginUserInfo } = useContext(dataContext); //로그인한 user정보
  const [profile, setProfile] = useState([]); //로그인한 유저정보 저장
  const [posts, setPosts] = useState([]); //포스트 정보 저장
  const [allComment, setAllComment] = useState([]); //답변 전체데이터 저장
  const [comment, setComment] = useState([]); //답변 정보 저장

  const loginUserInfoId = loginUserInfo.id;

  const findMyComment = (allComment, loginUserInfoId) => {
    return allComment.filter((data) => data.writerUserId === loginUserInfoId);
  };
  const myComment = findMyComment(allComment, loginUserInfoId);

  //NOTE - 수퍼베이스 데이터 가져오기
  //답변테이블 : 답변데이터 전체 가져오기
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
        myComment,
        loginUserInfoId,
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
