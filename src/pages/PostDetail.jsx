import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { postContext } from "../contexts/PostContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../services/supabaseClient";
import { CircleCheck, CircleX } from "lucide-react";

const PostDetail = () => {
  const navigate = useNavigate();
  const handleEditPostMove = (id) => {
    navigate(`/modify/${id}`, {
      state: {
        title: posts.title,
        description: posts.description,
      },
    });
  };

  const { id } = useParams();
  console.log("id => ", id);
  const { loginUser } = useContext(dataContext);
  // filter

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log("error =>", error);
      } else {
        console.log("post data =>", data);
        setPosts(data);
      }
    };
    fetchPosts();
  }, [id]);

  console.log("user=>", loginUser);

  return (
    <StContainer>
      {/* 채택 여부 */}
      <StState />

      {/* 타이틀 */}

      {/* 상세정보 */}
      <StInfo>
        <StLeftArea>
          <StTitle>{posts.title}</StTitle>
          <StSubWriteInfo>
            <StUser>
              <img />
              <span>{posts.userId}</span>
            </StUser>
            <StDate>
              {posts.created_at ? posts.created_at.split("T")[0] : ""}
            </StDate>
          </StSubWriteInfo>
        </StLeftArea>
        {posts.solve ? <StStyledCircleCheck /> : <StStyledCircleX />}
        {/* {loginUser && loginUser.id === posts.writerUserId && ( */}
        <StRightArea>
          <StBtn onClick={() => handleEditPostMove(posts.id)}>수정</StBtn>
          <StBtn>삭제</StBtn>
        </StRightArea>
        {/* )} */}
      </StInfo>

      {/* 글 영역 */}
      <StDescArea>
        <StDescription>{posts.description}</StDescription>
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
const StTextArea = styled.textarea``;
const StCodeArea = styled.textarea``;

export default PostDetail;
