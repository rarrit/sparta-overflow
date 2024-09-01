import { useState, useContext } from "react";
import styled from "styled-components";
import { mypageDataContext } from "../pages/Mypage";
import { CircleCheck, CircleX } from "lucide-react";

const MypageTab = () => {
  const [activeTab, setActiveTab] = useState("작성한글");
  const { profile, posts, comment } = useContext(mypageDataContext);
  console.log("posts", posts);

  const OnClickTabHandler = (tabTitle) => {
    // e.preventDefault();
    setActiveTab(tabTitle);
  };

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
              <div key={mypost.id}>
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
          style={{ backgroundColor: "blue" }}
        >
          {/*
          {comment.map((mycomment) => {
            return (
              <div key={mycomment.id}>
                <div>
                  {mycomment.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
                </div>
                <div>{mycomment.title}</div>
                <div>{mycomment.description}</div> 
                <div>
                  {new Date(mycomment.created_at)
                    .toLocaleDateString()
                    .replace(/\.$/, "")}
                </div>
              </div>
            );
          })}
          */}
        </StPostingContent>
      </StPostingContentBox>
    </StMypageTabContainer>
  );
};

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
