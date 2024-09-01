import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { CircleCheck, CircleX, Copy, CheckCheck } from "lucide-react";
import { filterDateOnlyYMD } from "../utils/dateInfoFilter";
import hljs from "highlight.js";

import SyntaxHighlighter from "react-syntax-highlighter";
import { railscasts } from "react-syntax-highlighter/dist/esm/styles/hljs";

const PostDetail = () => {
  const navigate = useNavigate();
  const [copy, setCopy] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [post, setPosts] = useState([]);

  //수정버튼
  const handleEditPostMove = (id) => {
    navigate(`/modify/${id}`, {
      state: {
        title: post.title,
        description: post.description,
        created_at: post.created_at,
        userName: userInfo.username,
        userId: userInfo.id,
        userEmail: userInfo.email,
        userProfileImg: userInfo.profileImage,
      },
    });
  };

  //삭제버튼
  const handleDeletePost = async (postId) => {
    let reallyDelete = confirm("정말 삭제하시겠습니까?");
    if (reallyDelete === true) {
      const { error } = await supabase.from("Post").delete().eq("id", postId);

      if (error) {
        console.error("게시글 삭제 오류:", error);
      } else {
        alert("게시글이 삭제되었습니다.");
        navigate("/");
      }
    } else {
      return;
    }
  };

  const { id } = useParams();
  const { loginUser } = useContext(dataContext);

  useEffect(() => {
    //게시글 정보
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("id", id)
        .single();
      console.log(post);
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setPosts(data);

        // 작성자 정보 로드
        if (data.userId) {
          fetchAuthor(data.userId);
        }
      }
    };

    //작성자 정보
    const fetchAuthor = async (userId) => {
      const { data, error } = await supabase
        .from("userinfo")
        .select("id, created_at, email, username, profileImage")
        .eq("id", userId)
        .single();
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setUserInfo(data);
      }
    };

    fetchAuthor();
    fetchPosts();
  }, [id]);

  // 임시 버튼
  const writeCommentHandel = () => {
    navigate(`/write/${id}`);
  };

  console.log("user=>", loginUser);
  console.log(userInfo);

  return (
    <StContainer>
      {/* 채택 여부 */}

      {/* 타이틀 */}

      {/* 상세정보 */}
      <StInfo>
        <StLeftArea>
          <StTitle>{post.title}</StTitle>
          <StSubWriteInfo>
            <StUser>
              <img src={userInfo.profileImage} alt="프로필이미지" />
              <span>{userInfo.username}</span>
            </StUser>
            <StDate>
              {post.created_at ? filterDateOnlyYMD(post.created_at) : ""}
            </StDate>
          </StSubWriteInfo>
        </StLeftArea>

        <StRightArea>
          {post.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
          {loginUser && loginUser.id === post.writerUserId && (
            <StBtnArea>
              <StBtn onClick={() => handleEditPostMove(post.id)}>수정</StBtn>
              <StBtn onClick={() => handleDeletePost(post.id)}>삭제</StBtn>
            </StBtnArea>
          )}
        </StRightArea>
      </StInfo>

      {/* 글 영역 */}
      <StDescArea>
        <StDescription>{post.description}</StDescription>

        <StCodeBox>
          <StCodeBoxTopAreaWithCopyBtn>
            <p>code</p>
            {copy ? (
              <StCopyCodeBtn>
                <CheckCheck size={16} />
                <span>copied !</span>
              </StCopyCodeBtn>
            ) : (
              <StCopyCodeBtn
                onClick={() => {
                  navigator.clipboard.writeText(post.code);
                  setCopy(true);
                  setTimeout(() => {
                    setCopy(false);
                  }, 2000);
                }}
              >
                <Copy size={16} />
                <span>copy code</span>
              </StCopyCodeBtn>
            )}
          </StCodeBoxTopAreaWithCopyBtn>
          <SyntaxHighlighter
            language="javascript"
            style={railscasts}
            customStyle={{
              padding: "25px",
            }}
            wrapLongLines={true}
          >
            {post.code}
          </SyntaxHighlighter>
        </StCodeBox>
      </StDescArea>
      <button onClick={writeCommentHandel}>댓글</button>
    </StContainer>
  );
};

const StContainer = styled.div``;

const StState = styled.div``;

const StInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #333;
`;

const StTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StLeftArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const StSubWriteInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  margin: 0;
`;

const StUser = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const StDate = styled.div`
  font-size: 0.8rem;
  line-height: 25px;
  color: #333;
`;

const StRightArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const StStyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
  width: 45px;
  height: 45px;
`;

const StStyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
  width: 45px;
  height: 45px;
`;
const StBtnArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const StBtn = styled.button`
  font-size: 0.8rem;
  line-height: 25px;
  color: #333;
  padding: 0px 8px;
  border: 1px solid black;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const StDescArea = styled.div`
  padding: 15px;
`;
const StDescription = styled.p``;

const StCodeBox = styled.div`
  background-color: #232323;
  border-radius: 15px;
  overflow: hidden;
  margin: 15px 0;
`;

const StCodeBoxTopAreaWithCopyBtn = styled.div`
  padding: 7px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #3a404d;
  color: white;
`;

const StCopyCodeBtn = styled.button`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const StTextArea = styled.textarea``;
const StCodeArea = styled.textarea``;

export default PostDetail;
