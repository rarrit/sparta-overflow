import { useState } from "react";

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
    <div>
      <br />
      <h1>댓글</h1>
      <textarea
        value={comment}
        onChange={changeInputHandle}
        placeholder="답변을 입력하세요"
        rows="4"
        cols="50"
      />
      <button onClick={addCommentHandle}>답변쓰기</button>
      <div>
        <h1>댓글 목록</h1>
        <br />
        <ul>
          {comments.map((newcomment, index) => (
            <li key={index}>{newcomment}</li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  );
};

export default PostWrite;
