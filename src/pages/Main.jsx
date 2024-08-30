import { useState, useEffect } from "react";
import styled from "styled-components";
import PostListItem from "../components/PostListItem";
import supabase from "../services/supabaseClient";

const Main = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("Post").select("*");
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const TabData = [
    {
      id: 1,
      button: "답변 전",
      content: <PostListItem posts={posts.filter((post) => !post.solve)} />,
    },
    {
      id: 2,
      button: "답변 후",
      content: <PostListItem posts={posts.filter((post) => post.solve)} />,
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
            data-active={activeTab === tab.id ? true : false}
            onClick={() => setActiveTab(tab.id)}
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
  font-size: 20px;
  font-weight: bold;
`;
const StTabButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StTabButton = styled.button`
  background-color: pink;
  cursor: pointer;
`;
