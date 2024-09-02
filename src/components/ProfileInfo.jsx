import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { mypageDataContext } from "../pages/Mypage";
import { dataContext } from "../contexts/DataContext";
import "../style/mypage.css";

const ProfileInfo = () => {
  const { profile, posts, myComment } = useContext(mypageDataContext);

  //기본이미지
  const defaultProfileImg =
    "https://i.namu.wiki/i/N7V1HbWE3OQETbgT61_lZaUlUywQLkh4ulOYLtJI4EKG1oQucfqexvNzzEbrcJ_8L-rVHQBDhzBcy5IFIvJ0iQ4sXfVnAiuK_GoRwTYG1Qgx_XNMJUWPHYrVbuWxXRoizxnY4fbhcIuNwBtLYomsyg.webp";

  const commentCount = myComment.filter((comment) => comment.isChosen).length;

  return (
    <StProfileContainer>
      <StUserInfoContainer>
        {profile.map((user) => {
          return (
            <div key={user.id}>
              <h2>{`${user.username}'s Page`}</h2>
              {/* <p>{user.email}</p> */}
            </div>
          );
        })}
      </StUserInfoContainer>
      <StProfileFlex>
        <StProfileImgContainer>
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
        </StProfileImgContainer>
        <StPostingCountContainer>
          <div>
            <h3>POST</h3>
            <p>{Array.isArray(posts) ? posts.length : 0}</p>
          </div>
          <div>
            <h3>COMMENT</h3>
            <p>{Array.isArray(myComment) ? myComment.length : 0}</p>
          </div>
          <div>
            <h3>ADORT</h3>
            <p>{commentCount > 0 ? commentCount : 0}</p>
          </div>
        </StPostingCountContainer>
      </StProfileFlex>
    </StProfileContainer>
  );
};

export default ProfileInfo;

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const StProfileFlex = styled.div`
  display: flex;
`;
const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h2 {
    font-size: 50px;
    font-weight: bold;
  }
`;
const StPostingCountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  gap: 20px;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-weight: 900;
      font-size: 24px;
      color: #000;
    }
    p {
      font-weight: 300;
      font-size: 24px;
      color: #000;
    }
  }
`;

const StProfileImgContainer = styled.div`
  width: 50%;
  height: 100%;
`;
const StProfileImgBox = styled.div`
  width: 90%;
  height: 100%;
  max-height: 500px;
  overflow: hidden;
  border: 2px solid #000;

  & img {
    width: 100%;
    object-fit: cover;
  }
`;
