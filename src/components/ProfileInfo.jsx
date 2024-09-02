import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";

import { mypageDataContext } from "../pages/Mypage";
import { dataContext } from "../contexts/DataContext";

const ProfileInfo = () => {
  // const { loginUserInfo } = useContext(dataContext);
  const { profile, posts, myComment } = useContext(mypageDataContext);
  // console.log("내코멘트?????", myComment);

  //기본이미지
  const defaultProfileImg =
    "https://i.namu.wiki/i/N7V1HbWE3OQETbgT61_lZaUlUywQLkh4ulOYLtJI4EKG1oQucfqexvNzzEbrcJ_8L-rVHQBDhzBcy5IFIvJ0iQ4sXfVnAiuK_GoRwTYG1Qgx_XNMJUWPHYrVbuWxXRoizxnY4fbhcIuNwBtLYomsyg.webp";

  const commentCount = myComment.filter((comment) => comment.isChosen).length;

  return (
    <StProfileContainer>
      <div>
        <StProfileImgBox>
          {profile.map((user) => {
            return (
              <img
                key={user.id}
                src={user.profileImage || defaultProfileImg} //null이면 기본이미지출력
              />
            );
          })}
        </StProfileImgBox>
      </div>
      <StUserInfoContainer>
        {profile.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
          );
        })}

        <StPostingCountContainer>
          <div>post : {Array.isArray(posts) ? posts.length : 0}</div>
          <div>comment : {Array.isArray(myComment) ? myComment.length : 0}</div>
          <div>like : {commentCount}</div>
        </StPostingCountContainer>
      </StUserInfoContainer>
    </StProfileContainer>
  );
};

export default ProfileInfo;

const StProfileContainer = styled.div`
  display: flex;
`;
const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const StPostingCountContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const StProfileImgBox = styled.div`
  max-width: 200px;
  max-height: 200px;
  width: 80%;
  height: 100%;
  border-radius: 50%;

  & img {
    width: 100%;
  }
`;
