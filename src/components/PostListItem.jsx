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
              <span>({post.commentCount})</span>
            </StPostMainInfo>
            <StPostAuthorInfo>
              <span>{post.userinfo.username}</span>│ {/* 작성자 */}
              <span>{filterDateOnlyYMD(post.created_at)}</span> {/* 날짜 */}
            </StPostAuthorInfo>
          </StPostInfoBox>
          <StPostPreview>
            <p>
              {post.description.length > 200
                ? `${post.title.substring(0, 200)}...`
                : post.description.substring(0, 200)}
            </p>{" "}
            {/* 내용 */}
          </StPostPreview>
        </StListWrap>
      ))}
    </>
  );
};

export default PostListItem;

const StListWrap = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const StPostInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  gap: 0.5rem;
  border-bottom: 1px solid #ccc;
`;

const StPostMainInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;

  span {
    font-size: 0.8rem;
    color: #666;
  }
`;

const StStyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
  flex-shrink: 0;
`;

const StStyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
  flex-shrink: 0;
`;

const StPostTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
`;

const StPostAuthorInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  font-size: 0.8rem;
  color: #333;
`;

const StPostPreview = styled.div`
  padding: 10px;
`;
