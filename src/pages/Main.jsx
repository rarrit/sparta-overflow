import { useState, useEffect } from "react";
import styled from "styled-components";
import PostListItem from "../components/PostListItem";
import supabase from "../services/supabaseClient";

const Main = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [morePosts, setMorePosts] = useState(true); // 더 많은 게시글이 있는지 확인
  const [activeTab, setActiveTab] = useState(1); // 활성 탭

  // 공통된 게시글 가져오기 함수
  const fetchPosts = async (start, end, solved) => {
    let query = supabase
      .from("Post")
      .select(
        `*, userinfo:userId (
          username,
          profileImage
        ),
        Comment:Comment!postId (id)`
      )
      .range(start, end)
      .order("created_at", { ascending: false });

    if (solved !== undefined) {
      query = query.filter("solve", "eq", solved);
    } // 채택답변여부를 필터링해서 solved값에 담음 (답변 후 : true / 답변 전 : false / 모든 글 : undefined),

    const { data, error } = await query;

    if (error) {
      console.log("무슨에러? =>", error); // 오류 처리
      return;
    } else {
      console.log("post data =>", data);

      if (data.length < 10) setMorePosts(false); //만약 data가 10개 미만이라면 setMorePosts를 false로 해서 더보기 버튼이 보이지 않게 함.

      // 댓글 갯수를 post객체 안에 commentCount 속성으로 넣어줌
      const commentCount = data.map((post) => ({
        ...post,
        commentCount: post.Comment.length,
      }));

      // 기존거를 더하냐 더하지 않느냐의 여부를 0에서 시작하냐 안하냐로 구분
      if (start === 0) setPosts(commentCount);
      else setPosts([...posts, ...commentCount]);
    }
  };

  // 게시글 더보기 함수
  const loadMorePost = () => {
    const start = posts.length; // 4. 현재 화면에 보여지는 포스트의 길이를 시작으로 ~ +9 한 값을 불러옴
    const end = start + 9;

    // 활성 탭에 따라 적절한 게시글 불러오기
    if (activeTab === 2) {
      fetchPosts(start, end, false); // solved값이 false이므로 답변 전 리스트 가져옴
    } else if (activeTab === 3) {
      fetchPosts(start, end, true); // solved값이 true이므로 답변 후 리스트 가져옴
    } else {
      fetchPosts(start, end); // solved값이 없으므로 모든 리스트 가져옴
    }
  };

  const TabData = [
    { id: 1, button: "모든 질문" },
    { id: 2, button: "답변 전" },
    { id: 3, button: "답변 후" },
  ];

  // 1. 답변전/후 상관 없이 10개의 post를 불러오고 채택된 게시글 있으면 바로 상태변경
  useEffect(() => {
    fetchPosts(0, 9);
  }, []);

  return (
    <>
      <StHomePostListTitle>Latest post</StHomePostListTitle>

      <StTabButtonWrap>
        {TabData.map((tab) => (
          <StTabButton
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);

              setPosts([]); // 2. 탭 버튼을 클릭하면 지금까지 불러왔던 포스트값을 초기화 함
              setMorePosts(true); // 그리고 10보다 더 많은 게시글이 있다고 상태를 변경해줌

              if (tab.id === 2) {
                // 3. 해당 탭에 있는 답변을 0부터 9까지 불러옴
                fetchPosts(0, 9, false);
              } else if (tab.id === 3) {
                fetchPosts(0, 9, true);
              } else {
                fetchPosts(0, 9);
              }
            }}
            $active={activeTab === tab.id}
          >
            {tab.button}
          </StTabButton>
        ))}
      </StTabButtonWrap>

      {/* 선택된 탭의 게시글 목록 */}
      <PostListItem posts={posts} setPosts={setPosts} />

      {/* 10개 이상의 게시글이 있는 경우 버튼 표시 */}
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
  background-color: ${(props) => (props.$active ? "#000" : "#fff")};
  border: 3px solid #000;
  color: ${(props) => (props.$active ? "white" : "#333")};
  padding: 8px 15px;
  border-radius: 15px;
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
