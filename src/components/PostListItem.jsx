import React from "react";
import styled from "styled-components";
import { CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { filterDateOnlyYMD } from "../utils/dateInfoFilter";

const PostListItem = ({ posts }) => {
  const navigate = useNavigate();

  const handleDetailMove = (post) => {
    navigate(`/detail/${post.id}`);
  };

  return (
    <>
      {posts.map((post) => (
        <StListWrap
          key={post.id}
          post={post}
          onClick={() => handleDetailMove(post)}
        >
          <StPostInfoBox>
            <StPostMainInfo>
              {post.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
              <StPostTitle>
                {post.title.length > 60
                  ? `${post.title.substring(0, 60)}...`
                  : post.title}
              </StPostTitle>{" "}
              {/* 제목 */}
            </StPostMainInfo>
            <div>
              <span>{post.writerUserId}</span> {/* 작성자 */}
              <span>{filterDateOnlyYMD(post.created_at)}</span> {/* 날짜 */}
            </div>
          </StPostInfoBox>
          <div>
            <p>
              {post.description.length > 200
                ? `${post.title.substring(0, 200)}...`
                : post.description.substring(0, 200)}
            </p>{" "}
            {/* 내용 */}
          </div>
        </StListWrap>
      ))}
    </>
  );
};

export default PostListItem;

const StListWrap = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const StPostInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StPostMainInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const StStyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
`;

const StStyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
`;

const StPostTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;
