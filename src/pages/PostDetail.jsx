import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { postContext } from "../contexts/PostContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { CircleCheck, CircleX } from "lucide-react";
import { filterDateOnlyYMD } from "../utils/dateInfoFilter";
import hljs from "highlight.js";

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


  // 임시 버튼
  const writeCommentHandel = () => {
    navigate(`/write/${id}`);
  };


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
        <pre>{post.code}</pre>
        {/* <StTextArea></StTextArea>
        <StCodeArea></StCodeArea> */}
        <button onClick={writeCommentHandel}>댓글</button>
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
const StTextArea = styled.textarea``;
const StCodeArea = styled.textarea``;

export default PostDetail;
