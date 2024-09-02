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
  const { isLogin, loginUserInfo } = useContext(dataContext);
  const { id: postId } = useParams();
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [authorId, setAuthorId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const auth = await supabase.auth.getUser();
      const writerUserId = auth.data.user.id;
      setUserId(writerUserId);
    };
    getUserId();
  }, []);

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
  };

  // 댓글 목록을 가져오는 함수
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("Comment")
      .select("*, writerUserId(id,profileImage)") // 얘 넣으면 수정 삭제 없어짐..
      // .select("*")
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
      {isLogin ? (
        <InputWrapper>
          <TextArea
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="답변을 입력하세요"
            rows="10"
            cols="50"
            // style={{
            //   width: "100%",
            //   padding: "10px 50px 10px 10px",
            //   border: "1px solid #ccc",
            //   borderRadius: "4px",
            //   fontSize: "1em",
            // }}
          />
          <button
            onClick={addCommentHandle}
            style={{
              position: "absolute",
              right: "16px",
              height: "20%",
              width: "11%",
              top: "87%",
              transform: "translateY(-70%)",
              padding: "5px 10px",
              fontSize: "1em",
              color: "#fff",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            답변쓰기
          </button>
        </InputWrapper>
      ) : (
        <p>댓글을 작성하려면 로그인이 필요합니다.</p>
      )}

      <ItemContainer>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {comments.map((newComment) => (
            <li
              key={newComment.id}
              // style={{
              //   marginBottom: "15px",
              //   padding: "10px",
              //   borderBottom: "1px solid #eee",
              // }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {newComment.writerUserId.profileImage && (
                  <img
                    src={newComment.writerUserId.profileImage}
                    alt="profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                )}
              </div>

              <div
              // style={{
              //   marginBottom: "5px",
              //   fontSize: "0.9em",
              //   color: "#666",
              // }}
              >
                {handleTimeCalculate(newComment.created_at)}
              </div>
              <div
                style={{
                  marginBottom: "5px",
                  fontSize: "0.9em",
                  color: "#666",
                }}
              >
                {newComment.username}
              </div>

              {editingId === newComment.id ? (
                <>
                  <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    // style={{
                    //   width: "100%",
                    //   padding: "10px",
                    //   border: "1px solid #ccc",
                    //   borderRadius: "4px",
                    //   fontSize: "1em",
                    //   marginBottom: "10px",
                    // }}
                  />
                  <button
                    onClick={editCommentHandle}
                    // style={{
                    //   marginRight: "10px",
                    //   padding: "5px 10px",
                    //   fontSize: "0.9em",
                    //   cursor: "pointer",
                    //   border: "1px solid #ddd",
                    //   backgroundColor: "#fff",
                    //   borderRadius: "4px",
                    // }}
                  >
                    수정완료
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    // style={{
                    //   marginRight: "10px",
                    //   padding: "5px 10px",
                    //   fontSize: "0.9em",
                    //   cursor: "pointer",
                    //   border: "1px solid #ddd",
                    //   backgroundColor: "#fff",
                    //   borderRadius: "4px",
                    // }}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <p style={{ margin: "5px 0" }}>{newComment.comment}</p>
                  {isLogin && userId === newComment.writerUserId.id && (
                    <>
                      <button
                        onClick={() =>
                          startEditing(newComment.id, newComment.comment)
                        }
                        // style={{
                        //   marginRight: "10px",
                        //   padding: "5px 10px",
                        //   fontSize: "0.9em",
                        //   cursor: "pointer",
                        //   border: "1px solid #ddd",
                        //   backgroundColor: "#fff",
                        //   borderRadius: "4px",
                        // }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteCommentHandle(newComment.id)}
                        // style={{
                        //   marginRight: "10px",
                        //   padding: "5px 10px",
                        //   fontSize: "0.9em",
                        //   cursor: "pointer",
                        //   border: "1px solid #ddd",
                        //   backgroundColor: "#fff",
                        //   borderRadius: "4px",
                        // }}
                      >
                        삭제
                      </button>
                    </>
                  )}
                  {authorId === userId && !newComment.isChosen && (
                    <button
                      onClick={() => selectHandle(newComment.id)}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        fontSize: "0.9em",
                        cursor: "pointer",
                        border: "1px solid #ddd",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                      }}
                    >
                      채택하기
                    </button>
                  )}
                  {newComment.isChosen && (
                    <p style={{ fontWeight: "bold", color: "green" }}>
                      채택된 답변
                    </p>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </ItemContainer>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 20px;
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative; /* 버튼을 input 필드 안에 위치시키기 위해 사용 */
`;

const TextArea = styled.textarea`
  width: auto;
  /* height: 80px; */
  padding: 10px 70px 10px 10px;
  border: 3px solid #000;
  border-radius: 10px;
  font-size: 1em;
  /* & - 자기자신 */
  &::placeholder {
    padding: 5px 0 0 5px;
    color: #aaa;
  }
`;

export default PostWrite;
