import { useState, useEffect } from "react";
import styled from "styled-components";
import PostListItem from "../components/PostListItem";
import supabase from "../services/supabaseClient";

const Main = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [latestPostDate, setLatestPostDate] = useState(null); // 가장 최신 게시글의 날짜
  const [morePosts, setMorePosts] = useState(true); // 더 많은 게시글이 있는지 확인
  const [activeTab, setActiveTab] = useState(1);

  const fetchPosts = async () => {
    // 게시글 리스트 정보
    const query = supabase
      .from("Post")
      .select(
        `*, userinfo:userId (
          username,
          profileImage
        ),
        Comment:Comment!postId (id)`
      )
      .order("created_at", { ascending: false })
      .limit(10);

    // 날짜가 설정되어 있으면, 해당 날짜 이전의 게시글을 가져옴
    if (latestPostDate) {
      query.lt("created_at", latestPostDate);
    }

    const { data, error } = await query;

    if (error) {
      console.log("무슨에러? =>", error);
    } else {
      console.log("post data =>", data);

      // 최신 게시글의 날짜 업데이트
      if (data.length > 0) {
        setLatestPostDate(data[data.length - 1].created_at);
      }

      // 게시글이 더 있는지 확인하고 상태저장 (boolean값)
      setMorePosts(data.length === 10);

      // 댓글 갯수를 post객체 안에 commentCount 속성으로 넣어줌
      const commentCount = data.map((post) => ({
        ...post,
        commentCount: post.Comment.length,
      }));

      // 추가로 가져온 게시글을 기존에 표시되던 것과 합쳐서 저장
      setPosts((prevPosts) => [...prevPosts, ...commentCount]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMorePost = () => {
    fetchPosts();
  };

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

  return (
    <>
      <StHomePostListTitle>Latest post</StHomePostListTitle>

      {/* 탭 버튼 */}
      <StTabButtonWrap>
        {TabData.map((tab) => (
          <StTabButton
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            active={activeTab === tab.id ? "true" : "false"}
          >
            {tab.button}
          </StTabButton>
        ))}
      </StTabButtonWrap>

      {/* 탭 내용 */}
      <div>{TabData.find((a) => a.id === activeTab)?.content}</div>

      {/* 더보기 버튼 */}
      {morePosts && (
        <StLoadMoreButton onClick={loadMorePost}>더 보기</StLoadMoreButton>
      )}
    </>
  );
};

export default Main;

const StHomePostListTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin: 20px 0;
`;
const StTabButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 1rem;
  margin-bottom: 30px;
`;

const StTabButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => (props.active === "true" ? "#000" : "#fff")};
  border: 2px solid #000;
  color: ${(props) => (props.active === "true" ? "white" : "#333")};
  padding: 8px 15px;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #444;
    color: white;
  }
`;

const StLoadMoreButton = styled.button`
  width: 100%;
  background-color: black;
  cursor: pointer;
  color: white;
  text-align: center;
  font-size: 20px;
  padding: 15px 10px;
  border-radius: 15px;
  margin-bottom: 20px;
`;
