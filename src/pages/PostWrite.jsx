import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";
import { useParams } from "react-router-dom";

const PostWrite = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { loginUserInfo: currentUser, isLogin } = useContext(dataContext);
  const { id: postId } = useParams();

  // 댓글 목록을 가져오는 함수
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("Comment")
      .select("*")
      .eq("postId", postId); // postId를 기준으로 필터링
    if (error) {
      console.error("가져오기 에러 =>", error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments(); // 컴포넌트가 마운트될 때 댓글을 가져옴
  }, [postId]);

  // 댓글을 추가하는 함수
  const addCommentHandle = async () => {
    if (comment.trim() !== "" && isLogin) {
      const { data, error } = await supabase.from("Comment").insert({
        comment,
        writerUserId: currentUser.id,
        postId,
      });
      if (error) {
        console.error("추가 에러 =>", error);
      } else {
        const newComment = {
          comment,
          writerUserId: currentUser.id,
        };
        setComments((prevComments) => [...prevComments, newComment]); // 상태 업데이트
        setComment(""); // 입력 필드 초기화
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
          {comments.map((newComment) => (
            <li key={newComment.id}>
              <div>작성자 ID: {newComment.writerUserId}</div>
              <p>{newComment.comment}</p>
            </li>
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

const ItemContainer = styled.div``;

const Strong = styled.strong`
  font-size: 15px;
  border-bottom: 2px solid #fff;
  padding-bottom: 100px;
  color: #333;
`;

const Header = styled.p`
  font-size: 15px;
  border-bottom: 2px solid #fff;
  color: #333;
  padding: 50px 0 20px 0;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

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
  margin-top: 10px;
  float: right;
  font-size: 13px;
`;

export default PostWrite;
