import { useContext } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { MypageDataContext } from "../pages/Mypage";
import "../style/mypage.css";

const ProfileInfo = () => {
  const { profile, posts, myComment } = useContext(MypageDataContext);

  const commentCount = myComment.filter((comment) => comment.isChosen).length;

  return (
    <StProfileContainer>
      <StUserInfoContainer>
        {profile.map((user) => {
          return (
            <div key={user.id}>
              <h2>{`${user.username}'s Page`}</h2>
            </div>
          );
        })}
      </StUserInfoContainer>
      <StProfileFlex>
        <StProfileImgContainer>
          <StProfileImgBox>
            {profile.map((user) => {
              return <img key={user.id} src={user.profileImage} />;
            })}
          </StProfileImgBox>
        </StProfileImgContainer>
        <StPostingCountContainer>
          <div>
            <h3>POST</h3>
            <p>{Array.isArray(posts) ? posts.length : 0}</p>
            {/* posts.length ?? 0 */}
          </div>
          <div>
            <h3>COMMENT</h3>
            <p>{Array.isArray(myComment) ? myComment.length : 0}</p>
            {/* myComment.length ?? 0 */}
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
  align-items: center;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-weight: 900;
      font-size: 34px;
      color: #000;
    }
    p {
      font-weight: 300;
      font-size: 34px;
      color: #000;
      margin-top: 10px;
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
