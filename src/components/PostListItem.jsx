import React from "react";
import styled from "styled-components";
import { CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PostListItem = ({ posts }) => {
  const navigate = useNavigate();

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
              <h3>
                {post.title.length > 20
                  ? `${post.title.substring(0, 80)}...`
                  : post.title}
              </h3>{" "}
              {/* 제목 */}
            </div>
            <div>
              <span>{post.writerUserId}</span> {/* 작성자 */}
              <span>{post.created_at}</span> {/* 날짜 */}
            </div>
          </div>
          <div>
            <p>
              {post.description.length > 300
                ? `${post.title.substring(0, 300)}...`
                : post.description.substring(0, 300)}
            </p>{" "}
            {/* 내용 */}
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
