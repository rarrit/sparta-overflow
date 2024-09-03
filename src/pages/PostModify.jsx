import React from "react";
import supabase from "../services/supabaseClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TuiEditor from "../components/TuiEditor";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import hljs from "highlight.js";

const PostModify = () => {
  // useLocation 을 사용해서 detail 페이지에서 useNavigate를 통해 전달한 값을 받아옴
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();  

  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postCode, setPostCode] = useState('');
  const { userName, userProfileImg } = location.state || {};

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("데이터 전달 오류:", error);
      } else {
        setPostTitle(data.title);
        setPostDesc(data.description);
        setPostCode(data.code);
      }
    };
    fetchPosts();
  }, [id])

  

  const handleModifyPost = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Post")
      .update({
        title: postTitle,
        description: postDesc,
        code: postCode
      })
      .eq("id", id);

    if (error) {
      console.error("포스트 업데이트 오류", error);
    } else {
      console.log("포스트 업데이트 성공:", data);
      navigate(-1); // 수정 후 상세 페이지로 이동
    }
  };
  const handleEditorChange = (newDescription) => {
    setPostDesc(newDescription);
  };

  return (
    <>
      <StContainer>
        {/* 상세정보 */}
        <StInfo>
          {/* 타이틀 */}
          <StTitle>
            <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
          </StTitle>
          <StLeftArea>
            <StSubWriteInfo>
              <StUser>
                <img src={userProfileImg} alt={`${userName}님의 프로필 이미지`}/>
                <span>{userName}</span>
              </StUser>
            </StSubWriteInfo>
          </StLeftArea>
        </StInfo>

        {/* 글 영역 */}
        <StDescArea>
          <StH3>내용 작성</StH3>          
          <TuiEditor description={postDesc} onChange={handleEditorChange} />
          <StH3>참고 코드 작성</StH3>
          <StCodeArea value={postCode} onChange={(e)=> setPostCode(e.target.value)} />          
        </StDescArea>
      </StContainer>
      <StFixedBtnArea>
        <StModifyBtn onClick={handleModifyPost}>수정</StModifyBtn>
      </StFixedBtnArea>
    </>
  );
};

const StContainer = styled.div`
  padding: 60px 0 80px;
`;


const StTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0 0 30px;
  input {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 3px solid #111;
    border-radius: 15px;
  }
`;

const StSubWriteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 3px solid #000;
  margin-bottom: 30px;
  padding: 0 0 10px;
`;

const StLeftArea = styled.div``;
const StUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 70px;
    height: 70px;
    border-radius: 15px;
    object-fit: cover;
    border: 3px solid black;
  }
  span {
    font-size: 20px;
    font-weight: 600;
    color: black;
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
    width:100%;
    height:40px;
    font-weight: bold;
    border:3px solid #111;
    border-radius:5px;
    cursor:pointer;
    transition:all .15s ease;
    &:hover {
      color:#fff;
      background:#111;      
    }
  }
`

const StModifyBtn = styled.button`
  width: 100px;
  height: 35px;
  font-weight: 500;
  text-align: center;
  background:#fff;
  border: 1px solid #666;
  border-radius: 5px;
  + button {
    background: #333;
    color: #fff;
  }
`;
const StDescArea = styled.div`
  padding: 0 20px;
`;
const StCodeArea = styled.textarea`
  width:100%;
  min-height:200px;
  border-radius:5px;
  border:1px solid #dadde6;
  padding:15px;
`;
const StH3 = styled.h3`  
  font-size:16px;
  font-weight:bold;
  color:#111;
  border-bottom:1px solid #111;
  margin:40px 0 15px;
  padding:0 0 6px;
`

export default PostModify;
