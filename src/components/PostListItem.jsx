import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CircleCheck, CircleX } from "lucide-react";
import { dataContext } from "../contexts/DataContext";
import supabase from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const PostListItem = () => {
  const { posts, setPosts } = useContext(dataContext);
  const navigate = useNavigate();

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
  }, [setPosts]);

  const DetailMove = (post) => {
    navigate(`/detail/${post.id}`);
  };

  return (
    <>
      {posts.map((post) => (
        <Article key={post.id} post={post} onClick={() => DetailMove(post)}>
          <div>
            <div>
              {post.solve ? <StyledCircleCheck /> : <StyledCircleX />}
              <h3>{post.title}</h3> {/* 제목 */}
            </div>
            <div>
              <span>{post.writerUserId}</span> {/* 작성자 */}
              <span>{post.created_at}</span> {/* 날짜 */}
            </div>
          </div>
          <div>
            <p>{post.description}</p> {/* 내용 */}
          </div>
        </Article>
      ))}
    </>
  );
};

export default PostListItem;

const Article = styled.article`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
`;
const StyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
`;

const StyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
`;
