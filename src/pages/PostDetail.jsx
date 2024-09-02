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
import PostWrite from "./PostWrite";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

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
  const { loginUserInfo } = useContext(dataContext);

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

  console.log("post.description =>>>>>>>>", post)

  // 임시 버튼
  const writeCommentHandel = () => {
    navigate(`/write/${id}`);
  };

  console.log("Logged in user:", loginUserInfo);
  console.log("Post data:", post);
  return (
    <>
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
          </StRightArea>
        </StInfo>

        {/* 글 영역 */}
        <StDescArea>
          
          <StDescription>
          {post.description ? (
            <Viewer initialValue={post.description} />
          ) : (
            <p>Loading...</p>
          )}
          </StDescription>

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

        {/* 댓글 컴포넌트 */}
        <PostWrite />
      </StContainer>

      {loginUserInfo.id === post.userId ? (
        <StFixedBtnArea>        
          <StBtn className="btnLine" onClick={() => handleEditPostMove(post.id)}>수정</StBtn>
          <StBtn className="btnBlack" onClick={() => handleDeletePost(post.id)}>삭제</StBtn>
        </StFixedBtnArea>
      ) : null}
    </>
  );
};


const StContainer = styled.div`
  padding: 60px 0 120px;
`;

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
  align-items: center;
  gap: 20px;
`;

const StUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  span {
    font-size: 18px;
    font-weight: 400;
    color: #333;
  }
`;
const StDate = styled.div`
  position: relative;
  font-size: 18px;
  font-weight: 400;
  color: #959595;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;
    width: 3px;
    height: 3px;
    background: #666;
    border-radius: 100%;
    transform: translateY(-50%);
  }
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
  width: 100px;
  height: 35px;
  font-weight: 500;
  text-align: center;
  background:#fff;
  border: 1px solid #666;
  border-radius: 5px;
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

const StFixedBtnArea = styled.div`
  position:fixed; 
  width:100%;
  left:0;
  bottom:0;
  padding:15px;
  display:flex;
  gap:10px;
  box-shadow:.5px .5px 10px rgba(0,0,0,.15);
  z-index:999;
  background:#fff;
  button {
    display:flex;
    align-items:center;
    justify-content:center;
    width:50%;
    height:35px;
    border:1px solid #111;
    border-radius:5px;
    cursor:pointer;
    transition:all .15s ease;
    &:hover {
      color:#fff;
      background:#111;      
    }
  }
`

export default PostDetail;
