import { useState, useContext, useEffect } from "react";
import { dataContext } from "../contexts/DataContext";
import supabase from "../services/supabaseClient";
import styled from "styled-components";

const ProfileInfo = () => {
  const { loginUserInfo } = useContext(dataContext); //user정보 :
  const [profile, setProfile] = useState([]);

  console.log("loginuser???", loginUserInfo);
  //기본이미지
  const defaultProfileImg =
    "https://i.namu.wiki/i/N7V1HbWE3OQETbgT61_lZaUlUywQLkh4ulOYLtJI4EKG1oQucfqexvNzzEbrcJ_8L-rVHQBDhzBcy5IFIvJ0iQ4sXfVnAiuK_GoRwTYG1Qgx_XNMJUWPHYrVbuWxXRoizxnY4fbhcIuNwBtLYomsyg.webp";

  //NOTE - 수퍼베이스 데이터 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await supabase
        .from("userinfo")
        .select()
        .eq("name", loginUserInfo);
      setProfile(response);
      console.log("respons", response);
    };
    fetchProfile();
  }, [loginUserInfo]);
  //supabase.from("userinfo") : supabase에서 가져올 테이블명 지정
  //.select("*") : 가져온테이블의 전체내용
  //.eq('name', 'test') : 열이 동일한 경우 결과를 필터링

  return (
    <StProfileContainer>
      <div>
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
        >
          <img
            src={defaultProfileImg} //null이면 기본이미지출력
            // alt={user.name}
          />
        </div>
      </div>
      <StUserInfoContainer>
        {/* {profile.map((user) => {
          return (
            <div key={user.id}>
              <h2>name: {user.name}</h2>
              <p>email: {user.email}</p>
            </div>
          );
        })} */}

        <StPostingCountContainer>
          <div>post</div>
          <div>comment</div>
          <div>like</div>
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
