import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { mypageDataContext } from "../pages/Mypage";
import { CircleCheck, CircleX } from "lucide-react";

const MypageTab = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("작성한글");
  const { profile, posts, comment, myComment, loginUserInfoId } =
    useContext(mypageDataContext);
  // console.log("posts", posts);
  const [myCommentGetPost, setMyCommentGetPost] = useState([]);
  console.log("내코멘트가 달린 포스팅정보", myComment);

  const handleDetailMove = (post) => {
    navigate(`/detail/${post.id}`);
  };

  const OnClickTabHandler = (tabTitle) => {
    // e.preventDefault();
    setActiveTab(tabTitle);
  };

  useEffect(() => {
    const fetchMyComment = async () => {
      const postIds = myComment.map((comment) => comment.postId);
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .in("id", postIds);
      if (error) {
        console.error("ErrorError :", error);
      } else {
        console.log("내답변가진 포스트data:", data);
        setMyCommentGetPost(data);
      }
    };
    fetchMyComment();
  }, []);

  return (
    <StMypageTabContainer>
      <StTabBox>
        <StTabItem
          className={`StTabItem ${activeTab === "작성한글" ? "active" : ""}`}
          onClick={() => {
            OnClickTabHandler("작성한글");
          }}
        >
          작성한글
        </StTabItem>
        <StTabItem
          className={`StTabItem ${activeTab === "댓글단글" ? "active" : ""}`}
          onClick={() => {
            OnClickTabHandler("댓글단글");
          }}
        >
          댓글단글
        </StTabItem>
      </StTabBox>
      <StPostingContentBox>
        <StPostingContent
          className={`StPostingContent ${
            activeTab === "작성한글" ? "active" : ""
          }`}
        >
          {posts.map((mypost) => {
            return (
              <div key={mypost.id} onClick={() => handleDetailMove(mypost)}>
                <div>
                  {mypost.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
                </div>
                <div>{mypost.title}</div>
                <div>{mypost.description}</div>
                <div>
                  {new Date(mypost.created_at)
                    .toLocaleDateString()
                    .replace(/\.$/, "")}
                </div>
              </div>
            );
          })}
        </StPostingContent>
        <StPostingContent
          className={`StPostingContent ${
            activeTab === "댓글단글" ? "active" : ""
          }`}
          style={{ backgroundColor: "#ebebeb" }}
        >
          {myCommentGetPost.map((post) => {
            return (
              <div key={post.id}>
                <div>
                  {post.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
                </div>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <div>
                  {new Date(post.created_at)
                    .toLocaleDateString()
                    .replace(/\.$/, "")}
                </div>
              </div>
            );
          })}
        </StPostingContent>
      </StPostingContentBox>
    </StMypageTabContainer>
  );
};
//.in : 특정 컬럼의 값이 주어진 배열에 포함된 레코드를 선택

export default MypageTab;

//SECTION - style
const StMypageTabContainer = styled.div``;

const StTabBox = styled.ul`
  display: flex;
`;
const StTabItem = styled.li`
  flex: 1;
  text-align: center;
  cursor: pointer;
`;
const StPostingContentBox = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;
const StPostingContent = styled.div`
  width: 100%;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #c9c9c9;
  display: none;

  &.active {
    display: block;
  }
`;
const StStyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
`;

const StStyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
`;
