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
      const { data, error } = await supabase.from("Users").select("*"); //Supabase 데이터의 "Users" 테이블에서 모든 데이터 선택
      if (error) {
        //에러일경우
        console.log("error =>", error);
      } else {
        //데이터 정상적으로 가져왔으면
        console.log("user data =>", data);

        setUsers(data);
      }
    };
    fetchData();
  }, []);

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
          {users.map((user) => {
            return (
              <img
                key={user.id}
                src={user.profileImage || defaultProfileImg} //null이면 기본이미지출력
                alt={user.name}
              />
            );
          })}
        </div>
      </div>
      <StUserInfoContainer>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>name: {user.name}</h2>
              <p>email: {user.email}</p>
            </div>
          );
        })}
        {/* {posts.map((post) => {
          return ( */}
        <div className="postingCount">
          <div>post: {posts.length}</div>
          <div>comment</div>
          <div>like</div>
        </div>
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
`;
