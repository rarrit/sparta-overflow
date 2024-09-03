import React from "react";
import styled from "styled-components";
import { CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { filterDateOnlyYMD } from "../utils/dateInfoFilter";
import { removeMarkdown } from "../utils/markdownFilter";

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
              <span>({post.commentCount})</span> {/* 댓글 갯수 */}
            </StPostMainInfo>
            <StPostAuthorInfo>
              <span>{post.userinfo.username}</span>│ {/* 작성자 */}
              <span>{filterDateOnlyYMD(post.created_at)}</span> {/* 날짜 */}
            </StPostAuthorInfo>
          </StPostInfoBox>
          <StPostPreview>
            <p>
              {post.description.length > 200
                ? `${removeMarkdown(post.title.substring(0, 200))}...`
                : removeMarkdown(post.description.substring(0, 200))}
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
  border: 3px solid #000;
  margin: 10px 0;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
`;

const StPostInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StPostMainInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;

  span {
    font-size: 0.8rem;
    color: #666;
  }
`;

const StStyledCircleCheck = styled(CircleCheck)`
  color: green;
  flex-shrink: 0;
`;

const StStyledCircleX = styled(CircleX)`
  color: red;
  flex-shrink: 0;
`;

const StPostTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const StPostAuthorInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  font-size: 16px;
  color: #959595;
  font-weight: 600;
`;

const StPostPreview = styled.div`
  padding: 10px;
`;
