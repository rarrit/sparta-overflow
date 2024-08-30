import { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";

// 사용자 데이터
const PostWrite = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  // const { currentUser } = useContext(dataContext);
  const { currentUser, isLogin } = useContext(dataContext);

  const fetchComments = async () => {
    const { data, error } = await supabase.from("Comment").select("*");
    if (error) {
      console.log("불러오기 오륲 => ", error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addCommentHandle = async () => {
    console.log(currentUser);
    if (comment.trim() !== "" && isLogin) {
      const { data, error } = await supabase
        .from("Comment")
        .insert({ id, created_at, postId, comment, isChosen, writerUserId });
      if (error) {
        console.log("추가에러=>", error);
      } else {
        setComment("");
        fetchComments();
      }
    } else {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
    }
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
      {isLogin ? (
        <>
          <Header>답변하기</Header>
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="답변을 입력하세요"
            rows="10"
            cols="50"
          />
          <Button onClick={addCommentHandle}>답변쓰기</Button>
        </>
      ) : (
        <p>댓글을 작성하려면 로그인이 필요합니다.</p>
      )}
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
