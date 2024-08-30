import { useState, useContext, useEffect } from "react";
import { dataContext } from "../contexts/DataContext";
import supabase from "../services/supabaseClient";
import styled from "styled-components";

const ProfileInfo = () => {
  const { users, setUsers, posts, setPosts } = useContext(dataContext);

  //기본이미지
  const defaultProfileImg =
    "https://i.namu.wiki/i/N7V1HbWE3OQETbgT61_lZaUlUywQLkh4ulOYLtJI4EKG1oQucfqexvNzzEbrcJ_8L-rVHQBDhzBcy5IFIvJ0iQ4sXfVnAiuK_GoRwTYG1Qgx_XNMJUWPHYrVbuWxXRoizxnY4fbhcIuNwBtLYomsyg.webp";

  //NOTE - 수퍼베이스 데이터 가져오기
  //유저 정보
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getSession(); //로그인한 사용자의 정보
      if (error) {
        //에러일경우
        console.log("error =>", error);
      } else {
        //데이터 정상적으로 가져왔으면
        console.log("user data =>", user);
        setUsers([user]); // 사용자 데이터를 배열로 설정
      }
    };
    fetchData();
  }, [setUsers]);

  //유저 포스팅
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Post").select("*");
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setPosts(data);
      }
    };
    fetchData();
  }, []);

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
          {users.map((user, index) => {
            return (
              <img
                key={index}
                src={defaultProfileImg} //null이면 기본이미지출력
                // alt={user.name}
              />
            );
          })}
        </div>
      </div>
      <StUserInfoContainer>
        {/* {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>name: {user.name}</h2>
              <p>email: {user.email}</p>
            </div>
          );
        })} */}
        {/* {posts.map((post) => {
          return ( */}
        <StPostingCountContainer>
          <div>post</div>
          <div>comment</div>
          <div>like</div>
        </StPostingCountContainer>
        {/* );
        })} */}
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
