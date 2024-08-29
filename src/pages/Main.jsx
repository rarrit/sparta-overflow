import { useContext } from "react";
import { postContext } from "../contexts/PostContext";
import { useState } from "react";
import styled from "styled-components";
import PostListItem from "../components/PostListItem";

const Main = () => {
  // context Test
  //const { testList } = useContext(postContext);
  //console.log("testList =>", testList);
  console.log(PostListItem.post);
  const TabData = [
    { id: 1, button: "답변 전", content: <PostListItem /> },
    { id: 2, button: "답변 후", content: "~~답변이 끝난 질문들~~~" },
  ];

  const [activeTab, setActiveTab] = useState(TabData[0].id);
  return (
    <>
      <HomePostListTitle>Latest post</HomePostListTitle>

      <TabButtonWrap>
        {TabData.map((tab) => (
          <TabButton
            key={tab.id}
            data-active={activeTab === tab.id ? "true" : "false"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.button}
          </TabButton>
        ))}
      </TabButtonWrap>
      <div>{TabData.find((a) => a.id === activeTab)?.content}</div>
    </>
  );
};

export default Main;

const HomePostListTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
const TabButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const TabButton = styled.button`
  background-color: pink;
  cursor: pointer;
`;
