import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";
import { useParams } from "react-router-dom";
import handleTimeCalculate from "../components/ChangeTime";

const PostWrite = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState();
  const [usernames, setUsernames] = useState({});
  const { isLogin, loginUserInfo } = useContext(dataContext);
  const { id: postId } = useParams();
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [authorId, setAuthorId] = useState(null);
  // console.log(loginUserInfo);
  useEffect(() => {
    const getUserId = async () => {
      const auth = await supabase.auth.getUser();
      const writerUserId = auth.data.user.id;
      setUserId(writerUserId);
    };
    getUserId();
  }, []);

  // 제가 userid를 writerUserId 이걸 가져다가 썼는데 이게 뭐라해야하지.. userid를 제대로 못 가져온다고 해야하나 네넹
  // 그래서 supavase에서 getuser로 따로 가져왔어요... auth해서... 아놔 ㅋㅋㅋㅋ
  // 손톱 잘랐더니 오타가 아주그냥

  const getPostInfo = async () => {
    const { data, error } = await supabase
      .from("Post")
      .select("userId")
      .eq("id", postId);
    if (error) {
      console.log("가져오기 에러 =>", error);
      return;
    }
    setAuthorId(data[0].userId);
    // getPostInfo();
  };

  console.log("authorId =>", authorId);
  console.log("userId =>", userId);
  // 댓글 목록을 가져오는 함수
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("Comment")
      .select("*")
      .eq("postId", postId); // postId를 기준으로 필터링
    if (error) {
      console.log("가져오기 에러 =>", error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
    getPostInfo(); // 컴포넌트가 마운트될 때 댓글을 가져옴
  }, [postId]);

  // 댓글을 추가하는 함수
  const addCommentHandle = async () => {
    if (comment.trim() !== "" && isLogin) {
      const { data, error } = await supabase.from("Comment").insert({
        comment,
        writerUserId: userId,
        username: loginUserInfo.username,
        postId,
      });
      if (error) {
        console.log("추가 에러 =>", error);
      } else {
        const newComment = {
          comment,
          writerUserId: userId,
          id: crypto.randomUUID(), // 내장메서드
          // 이것도 id 못 받아오길래 랜덤으로 가져다주는 자바스크림트 내장 메서드라고... 커어어어....
        };
        setComments((prevComments) => [...prevComments, newComment]); // 상태 업데이트
        setComment(""); // 입력 필드 초기화
        fetchComments();
      }
    } else {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
    }
  };

  // 댓글 수정 부분
  const editCommentHandle = async () => {
    if (editComment.trim() !== "" && editingId) {
      const { error } = await supabase
        .from("Comment")
        .update({ comment: editComment })
        .eq("id", editingId);
      if (error) {
        console.log("수정에러 =>", error);
      } else {
        setEditComment("");
        setEditingId(null);
        fetchComments();
      }
    }
  };

  const deleteCommentHandle = async (id) => {
    console.log(id);
    const { error } = await supabase.from("Comment").delete().eq("id", id);
    if (error) {
      console.log("삭제 에러=>", error);
    } else {
      fetchComments();
    }
  };

  const startEditing = (commentId, currentComment) => {
    setEditingId(commentId);
    setEditComment(currentComment);
  };
  console.log(comments);

  // 댓글 채택
  const selectHandle = async (id) => {
    const { data, error } = await supabase
      .from("Comment")
      .upsert({ id: id, isChosen: true })
      .select();
    // 채택 후 댓글 목록 갱신
    if (error) {
      console.log("업데이트 에러 =>", error);
    } else {
      fetchComments();
    }
  };

  return (
    <StContainer>
      <ItemContainer>
        <Strong>댓글 목록</Strong>
        <CommentList>
          {comments.map((newComment) => (
            <li key={newComment.id}>
              <div>{handleTimeCalculate(newComment.created_at)}</div>
              <div>작성자: {newComment.username}</div>
              {editingId === newComment.id ? (
                <>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  />
                  <button onClick={editCommentHandle}>수정완료</button>
                  <button onClick={() => setEditingId(null)}>취소</button>
                </>
              ) : (
                <>
                  <p>{newComment.comment}</p>
                  {isLogin && userId === newComment.writerUserId && (
                    <>
                      <button
                        onClick={() =>
                          startEditing(newComment.id, newComment.comment)
                        }
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteCommentHandle(newComment.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}

                  {/* {authorId === userId && (
                    <button
                      onClick={() => selectHandle(newComment.id)}
                      disabled={newComment.isChosen}
                    >
                      {newComment.isChosen ? "채택된 답변" : "채택하기"}
                    </button>
                  )} */}

                  {authorId === userId && !newComment.isChosen && (
                    <button onClick={() => selectHandle(newComment.id)}>
                      채택하기
                    </button>
                  )}
                  {newComment.isChosen && <p>채택된 답변</p>}
                </>
              )}
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
