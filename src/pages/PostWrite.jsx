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
          username: loginUserInfo.username,
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
                    {authorId === userId && !newComment.isChosen && (
                      <ActionButton onClick={() => selectHandle(newComment.id)}>
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
                      border: "1px solid #000",
                      borderRadius: "4px",
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
                  <CommentText>{newComment.comment}</CommentText>
                </>
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
    content: '';
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
  background:#fff;
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
  border-radius: 10px;
  background-color: #000;
  color: #fff;
  &.btnLine {
    width:80px;
    font-weight:500;
    text-align: center;
    background:#fff;
    color:#000;
  }
`;

const CommentText = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 5px 0;
`;

const CommentTime = styled.div`  
  font-size:22px;
  font-weight:bold;
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
    height:30px;
    cursor: pointer;
    border: 3px solid green;
    border-radius: 10px;
    background-color: green;
    color: #fff;
`;
const StLeftArea = styled.div`
  
`;
const StRightArea = styled.div`
  
`;

export default PostWrite;
