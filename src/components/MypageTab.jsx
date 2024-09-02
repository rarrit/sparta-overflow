import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { mypageDataContext } from "../pages/Mypage";
import { CircleCheck, CircleX } from "lucide-react";
import { filterDateOnlyYMD } from "../utils/dateInfoFilter";

const MypageTab = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("작성한글");
  const { profile, posts, comment, myComment, loginUserInfoId } =
    useContext(mypageDataContext);

  const [myCommentGetPost, setMyCommentGetPost] = useState([]);

  const handleDetailMove = (post) => {
    navigate(`/detail/${post.id}`);
  };

  const OnClickTabHandler = (tabTitle) => {
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
        setMyCommentGetPost(data);
      }
    };
    fetchMyComment();
  }, [myComment]);

  return (
    <StMypageTabContainer>
      <StTabBox>
        <StTabItem
          className={`StTabItem ${activeTab === "작성한글" ? "active" : ""}`}
          onClick={() => {
            OnClickTabHandler("작성한글");
          }}
        >
          POST
        </StTabItem>
        <StTabItem
          className={`StTabItem ${activeTab === "댓글단글" ? "active" : ""}`}
          onClick={() => {
            OnClickTabHandler("댓글단글");
          }}
        >
          COMMENT
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
              <StPost key={mypost.id} onClick={() => handleDetailMove(mypost)}>
                <StPostTop>
                  <div>
                    {mypost.solve ? (
                      <StStyledCircleCheck />
                    ) : (
                      <StStyledCircleX />
                    )}
                  </div>
                  <div className="checkPostTitle">
                    <StPostTitle>
                      <h2>{mypost.title}</h2>
                      <div className="createTime">
                        {filterDateOnlyYMD(mypost.created_at)}
                      </div>
                    </StPostTitle>
                    <StPostContent>
                      <p>{mypost.description}</p>
                    </StPostContent>
                  </div>
                </StPostTop>
              </StPost>
            );
          })}
        </StPostingContent>
        <StPostingContent
          className={`StPostingContent ${
            activeTab === "댓글단글" ? "active" : ""
          }`}
        >
          {myCommentGetPost.map((post) => {
            return (
              <StPost key={post.id} onClick={() => handleDetailMove(post)}>
                <StPostTop>
                  <div>
                    {post.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
                  </div>
                  <div className="checkPostTitle">
                    <StPostTitle>
                      <h2>{post.title}</h2>
                      <div className="createTime">
                        {filterDateOnlyYMD(post.created_at)}
                      </div>
                    </StPostTitle>
                    <StPostContent>
                      <p>{post.description}</p>
                    </StPostContent>
                  </div>
                </StPostTop>
              </StPost>
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
const StMypageTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StTabBox = styled.ul`
  display: flex;
  gap: 20px;
`;
const StTabItem = styled.li`
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 15px;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  font-weight: 900;
`;
const StPostingContentBox = styled.div`
  width: 100%;
  position: relative;
`;
const StPostingContent = styled.div`
  width: 100%;
  flex-direction: column;
  gap: 20px;
  display: none;

  &.active {
    display: flex;
  }
`;
const StStyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
`;

const StStyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
`;
const StPost = styled.div`
  border: 2px solid #000;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;

  & h2 {
    font-size: 20px;
    font-weight: 600;
  }
`;
const StPostTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  & .checkPostTitle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1;
  }

  & .createTime {
    font-weight: 600;
    display: flex;
    align-items: center;
  }
`;
const StPostContent = styled.div`
  height: 80px;
  width: 100%;
`;
const StPostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
