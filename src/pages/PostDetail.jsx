import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { postContext } from "../contexts/PostContext";
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
  // 게시글 삭제 버튼 핸들러
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
  console.log("id => ", id);
  const { loginUser } = useContext(dataContext);
  // filter

  const [userInfo, setUserInfo] = useState([]);
  const [post, setPosts] = useState([]);
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

  console.log(userInfo.username);
  //코드 하이라이트
  // const highlightedCode = hljs.highlight().value;

  const [copy, setCopy] = useState(false);

  console.log("user=>", loginUser);
  console.log(userInfo);

  return (
    <StContainer>
      {/* 채택 여부 */}
      <StState />

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
        {post.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
        {/* {loginUser && loginUser.id === post.writerUserId && ( */}
        <StRightArea>
          <StBtn onClick={() => handleEditPostMove(post.id)}>수정</StBtn>
          <StBtn onClick={() => handleDeletePost(post.id)}>삭제</StBtn>
        </StRightArea>
        {/* )} */}
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
        {/* <StTextArea></StTextArea>
        <StCodeArea></StCodeArea> */}
      </StDescArea>
    </StContainer>
  );
};

const StContainer = styled.div``;

const StState = styled.div``;

const StTitle = styled.h2``;

const StSubWriteInfo = styled.div``;

const StInfo = styled.div``;

const StLeftArea = styled.div``;
const StUser = styled.div``;
const StDate = styled.div``;

const StRightArea = styled.div``;

const StStyledCircleCheck = styled(CircleCheck)`
  color: green; /* 초록색 */
`;

const StStyledCircleX = styled(CircleX)`
  color: red; /* 빨간색 */
`;
const StBtnArea = styled.div``;
const StBtn = styled.button``;

const StDescArea = styled.div``;
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
