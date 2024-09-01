import { useState, useEffect } from "react";
import styled from "styled-components";
import PostListItem from "../components/PostListItem";
import supabase from "../services/supabaseClient";

const Main = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //게시글 리스트 정보
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select(
          `*, userinfo:userId (
            username,
            profileImage
          ),
          Comment:Comment!postId (id)`
        )
        .order("created_at", { ascending: false });
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setPosts(data);

        //댓글 갯수를 post객체안에 commentCount속성으로 넣어줌
        const commentCount = data.map((post) => ({
          ...post,
          commentCount: post.Comment.length,
        }));
        setPosts(commentCount);

        //작성자 정보 로드
        if (data.userId) {
          fetchAuthor(data.userId);
        }
      }
    };
    fetchPosts();
  }, []);

  const TabData = [
    {
      id: 1,
      button: "모든 질문",
      content: <PostListItem posts={posts} userInfo={userInfo} />,
    },
    {
      id: 2,
      button: "답변 전",
      content: (
        <PostListItem
          posts={posts.filter((post) => !post.solve)}
          userInfo={userInfo}
        />
      ),
    },
    {
      id: 3,
      button: "답변 후",
      content: (
        <PostListItem
          posts={posts.filter((post) => post.solve)}
          userInfo={userInfo}
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(TabData[0].id);
  return (
    <>
      <StHomePostListTitle>Latest post</StHomePostListTitle>

      <StTabButtonWrap>
        {TabData.map((tab) => (
          <StTabButton
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            active={activeTab === tab.id ? "true" : "false"}
            // 불린값을 문자열로 주지 않으면 스타일드컴포넌트에서 에러가 납니다!
          >
            {tab.button}
          </StTabButton>
        ))}
      </StTabButtonWrap>

      <div>{TabData.find((a) => a.id === activeTab)?.content}</div>
    </>
  );
};

export default Main;

const StHomePostListTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: 30px 0;
`;
const StTabButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const StTabButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => (props.active === "true" ? "#444" : "#888")};
  color: ${(props) => (props.active ? "white" : "#333")};
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #444;
    color: white;
  }
`;
