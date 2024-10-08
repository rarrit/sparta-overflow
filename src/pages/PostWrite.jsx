import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import supabase from "../services/supabaseClient";
import { dataContext } from "../contexts/DataContext";
import { useParams } from "react-router-dom";
import handleTimeCalculate from "../components/ChangeTime";

const PostWrite = ({ setPosts }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState();
  const { isLogin, loginUserInfo } = useContext(dataContext);
  const { id: postId } = useParams();
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState({});
  const [replyingId, setReplyingId] = useState(null);

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
      .select("*, writerUserId(id,profileImage),userinfo(profileImage)") // 얘 넣으면 수정 삭제 없어짐..
      // .select("*")
      .eq("postId", postId) // postId를 기준으로 필터링
      .is("parentId", null);
    if (error) {
      console.log("가져오기 에러 =>", error);
    } else {
      console.log(data);
      setComments(data);
      data.forEach((comment) => {
        fetchReplies(comment.id);
      });
    }
  };

  useEffect(() => {
    fetchComments();
    getPostInfo(); // 컴포넌트가 마운트될 때 댓글을 가져옴
  }, [postId]);

  // 대댓글
  const fetchReplies = async (commentId) => {
    const { data, error } = await supabase
      .from("Comment")
      .select("*, writerUserId(id,profileImage),userinfo(profileImage)")
      .eq("parentId", commentId);
    console.log("dat=>", data);
    // debugger;

    if (error) {
      console.log("가져오기 에러 =>", error);
    } else {
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: data,
      }));
    }
  };

  // 댓글을 추가하는 함수
  const addCommentHandle = async () => {
    if (comment.trim() !== "" && isLogin) {
      const { data, error } = await supabase.from("Comment").insert({
        comment,
        writerUserId: userId,
        username: loginUserInfo.username,
        postId,
        parentId: null,
      });
      if (error) {
        console.log("추가 에러 =>", error);
      } else {
        const newComment = {
          comment,
          writerUserId: userId,
          username: loginUserInfo.username,
          id: crypto.randomUUID(),
          parentId: null, // 내장메서드
          // 이것도 id 못 받아오길래 랜덤으로 가져다주는 자바스크림트 내장 메서드라고...
        };
        setComments((prevComments) => [...prevComments, newComment]); // 상태 업데이트
        setComment(""); // 입력 필드 초기화
        fetchComments();
      }
    } else {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
    }
  };

  // 대댓글 추가
  const addReplyHandle = async (commentId) => {
    console.log("commentid=>", comment);
    if (reply.trim() !== "" && isLogin) {
      const { data, error } = await supabase.from("Comment").insert({
        comment: reply,
        writerUserId: userId,
        username: loginUserInfo.username,
        postId,
        parentId: commentId,
      });

      if (error) {
        console.log("추가 에러 =>", error);
      } else {
        const newReply = {
          comment: reply,
          writerUserId: userId,
          username: loginUserInfo.username,
          id: crypto.randomUUID(),
          parentId: commentId,
        };

        setReplies((prevReplies) => ({
          ...prevReplies,
          [commentId]: [...(prevReplies[commentId] || []), newReply],
        }));

        setReply(""); // 입력 필드 초기화
        setReplyingId(null); // 대댓글 입력 모드를 종료
        fetchReplies(commentId); // 대댓글 목록을 갱신
      }
    } else {
      alert("대댓글을 작성하려면 로그인이 필요합니다.");
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
    const isConfirmed = window.confirm("정말 삭제하겠습니까?");
    if (isConfirmed) {
      const { error } = await supabase.from("Comment").delete().eq("id", id);
      if (error) {
        console.log("삭제 에러=>", error);
      } else {
        fetchComments();
      }
    }
  };

  const startEditing = (commentId, currentComment) => {
    setEditingId(commentId);
    setEditComment(currentComment);
  };

  // 댓글 채택
  const selectHandle = async (id) => {
    const { data: commentData, error: commentError } = await supabase
      .from("Comment")
      .update({ isChosen: true }) // 댓글을 채택된 상태로 업데이트
      .eq("id", id)
      .select()
      .single();

    // 채택 후 댓글 목록 갱신
    if (commentError) {
      console.log("댓글 업데이트 에러 =>", commentError);
    } else {
      const postId = commentData?.postId; // 댓글의 게시글을 가져옴

      const { error: postError } = await supabase
        .from("Post")
        .update({ solve: true })
        .eq("id", postId);

      if (postError) {
        console.log("post 업데이트 에러 =>", postError);
      } else {
        fetchComments();
      }
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
        <CommentNotification>
          댓글을 작성하려면 로그인이 필요합니다.
        </CommentNotification>
      )}

      <ItemContainer>
        <CommentList>
          {comments.map((newComment) => (
            <CommentItem key={newComment.id}>
              <CommentHeader>
                {newComment.writerUserId.profileImage && (
                  <ProfileImage
                    src={newComment.writerUserId.profileImage}
                    alt="profile"
                  />
                )}
                <StLeftArea>
                  <CommentDetails>
                    <CommentUserName>{newComment.username}</CommentUserName>
                    <CommentTime>
                      {handleTimeCalculate(newComment.created_at)}
                    </CommentTime>
                    {authorId === userId &&
                      userId !== newComment.writerUserId.id &&
                      !newComment.isChosen && (
                        <ActionButton
                          onClick={() => selectHandle(newComment.id)}
                        >
                          채택하기
                        </ActionButton>
                      )}
                    {newComment.isChosen && (
                      <SelectedComment>채택된 댓글</SelectedComment>
                    )}
                  </CommentDetails>
                </StLeftArea>
                <StRightArea>
                  {isLogin && userId === newComment.writerUserId.id && (
                    <>
                      <ActionButton
                        className="btnLine"
                        onClick={() =>
                          startEditing(newComment.id, newComment.comment)
                        }
                      >
                        수정
                      </ActionButton>
                      <ActionButton
                        className="btnLine"
                        onClick={() => deleteCommentHandle(newComment.id)}
                      >
                        삭제
                      </ActionButton>
                    </>
                  )}
                </StRightArea>
              </CommentHeader>
              {editingId === newComment.id ? (
                <>
                  <textarea
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows="10"
                    cols="50"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "3px solid #000",
                      borderRadius: "10px",
                      fontSize: "1em",
                      marginBottom: "10px",
                    }}
                  />
                  <ActionButton onClick={editCommentHandle}>
                    수정완료
                  </ActionButton>
                  <ActionButton onClick={() => setEditingId(null)}>
                    취소
                  </ActionButton>
                </>
              ) : (
                <>
                  <CommentText style={{ margin: "5px 0 40px 0" }}>
                    {newComment.comment}
                  </CommentText>
                </>
              )}
              {/* 대댓글 */}
              {replies[newComment.id] &&
                replies[newComment.id].map((replyItem) => (
                  <CommentItem key={replyItem.id}>
                    <CommentHeader>
                      {replyItem.userinfo?.profileImage && (
                        <ProfileImage
                          src={replyItem.userinfo.profileImage}
                          alt="profile"
                        />
                      )}
                      <CommentDetails>
                        <CommentUserName>{replyItem.username}</CommentUserName>
                        <CommentTime>
                          {handleTimeCalculate(replyItem.created_at)}
                        </CommentTime>
                      </CommentDetails>
                    </CommentHeader>
                    <CommentText>{replyItem.comment}</CommentText>
                  </CommentItem>
                ))}
              {/* 대댓글 쓰기 */}
              {replyingId === newComment.id ? (
                <InputWrapper>
                  <TextArea
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="댓글을 입력하세요!"
                    rows="5"
                    cols="30"
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => addReplyHandle(newComment.id)}
                      style={{
                        width: "90px",
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#000",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      등록
                    </button>
                    <button
                      onClick={() => setReplyingId(null)}
                      style={{
                        width: "90px",
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#000",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      취소
                    </button>
                  </div>
                </InputWrapper>
              ) : (
                <button
                  onClick={() => setReplyingId(newComment.id)}
                  style={{
                    width: "90px",
                    padding: "10px",
                    backgroundColor: "#000",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  댓글 쓰기
                </button>
              )}
            </CommentItem>
          ))}
        </CommentList>
      </ItemContainer>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative; /* 버튼을 input 필드 안에 위치시키기 위해 사용 */
`;

const CommentNotification = styled.div`
  margin: 10px 0 40px 0;
  padding: 20px 10px;
  background-color: #fff;
  border: 3px solid #000;
  border-radius: 10px;
  color: #000;
  font-size: 16px;
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
const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  position: relative;
  padding: 10px 0 60px 120px;
  &:before {
    content: "";
    position: absolute;
    left: 45px;
    bottom: 0;
    width: 1px;
    height: 100%;
    background: #111;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  border-bottom: 1px dashed #111;
  padding-bottom: 10px;
`;
const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 90px;
  height: 90px;
  background: #fff;
  border: 3px solid #111;
  border-radius: 15px;
`;

const CommentDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 16px;
  height: 30px;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 6px;
  background-color: #000;
  color: #fff;
  &.btnLine {
    width: 80px;
    font-weight: 500;
    text-align: center;
    background: #fff;
    color: #000;
  }
`;

const CommentText = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 5px 0;
`;
const CommentTime = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

const CommentUserName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;
const SelectedComment = styled.p`
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 16px;
  height: 30px;
  cursor: pointer;
  border: 3px solid green;
  border-radius: 4px;
  background-color: green;
  color: #fff;
`;
const StLeftArea = styled.div``;
const StRightArea = styled.div``;

export default PostWrite;
