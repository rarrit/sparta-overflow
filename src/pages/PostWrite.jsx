import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";

// 사용자 데이터
const PostWrite = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 댓글을 입력하면 호출되는 함수
  const changeInputHandle = (e) => {
    setComment(e.target.value);
  };

  const addCommentHandle = () => {
    if (comment.trim() !== "") {
      // 빈배열이 아니면 추가함
      setComments([...comments, comment]);
      setComment(""); // 입력 후에 필드가 초기화 됨
    }
    console.log(comment);
  };
  return (
    <StContainer>
      <ItemContainer>
        <Strong>댓글 목록</Strong>
        <CommentList>
          {comments.map((newcomment, index) => (
            <li key={index}>{newcomment}</li>
          ))}
        </CommentList>
      </ItemContainer>
      <Header>답변하기</Header>
      <TextArea
        value={comment}
        onChange={changeInputHandle}
        placeholder="답변을 입력하세요"
        rows="10"
        cols="50"
      />
      <Button onClick={addCommentHandle}>답변쓰기</Button>
    </StContainer>
  );
};

const StContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  font-family: "Arial", sans-serif;
  min-height: 100vh;
`;

const ItemContainer = styled.div`
  /* border-top: 2px solid #000;
  border-right: 2px solid #000;
  border-left: 2px solid #000;
  border-bottom: 1px solid #000;
  background-color: #000;
  color: #fff; */
`;
const Strong = styled.strong`
  font-size: 15px;
  /* font-weight: bold; */
  border-bottom: 2px solid #fff;
  padding-bottom: 100px;
  color: #333;
`;

const Header = styled.p`
  font-size: 15px;
  /* font-weight: bold; */
  border-bottom: 2px solid #fff;
  color: #333;
  padding: 50px 0 20px 0;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

// const CommentItem = styled.li`
//   background-color: #1a1a1a;
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
// `;

const TextArea = styled.textarea`
  font-size: 13px;
  width: 100%;
  padding: 10px;
  background-color: #f3f3f3;
  color: #858585;
  border: 1px solid #fff;
  border-radius: 10px;
  resize: none;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* font-weight: bold; */
  margin-top: 10px;
  float: right;
  font-size: 13px;

  /* &:hover {
    background-color: #ccc;
  } */
`;

export default PostWrite;
