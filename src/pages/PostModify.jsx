import React from "react";
import { useLocation } from "react-router-dom";
import TuiEditor from "../components/TuiEditor";
import styled from "styled-components";

const PostModify = () => {
  // useLocation 을 사용해서 detail 페이지에서 useNavigate를 통해 전달한 값을 받아옴
  const location = useLocation();
  const { title, description } = location.state || {};
  console.log("title =>", title, "description =>", description);
  return (
    <>
      <StContainer>
        {/* 채택 여부 */}
        <StState />

        {/* 상세정보 */}
        <StInfo>
          {/* 타이틀 */}
          <StTitle>
            <input type="text" value={title} />
          </StTitle>
          <StLeftArea>
            <StSubWriteInfo>
              <StUser>
                <img />
                <span>김민규</span>
              </StUser>
              <StDate>2024-08-28</StDate>
            </StSubWriteInfo>
          </StLeftArea>
          {/* {loginUser && loginUser.id === posts.writerUserId && ( */}
          <StRightArea>
            <StBtnArea>
              <StBtn>수정</StBtn>
              <StBtn>삭제</StBtn>
            </StBtnArea>
          </StRightArea>
          {/* )} */}
        </StInfo>

        {/* 글 영역 */}
        <StDescArea>
          <TuiEditor description={description} />
        </StDescArea>
      </StContainer>
    </>
  );
};

const StContainer = styled.div`
  padding: 60px 0 30px;
`;

const StState = styled.div``;

const StTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600p;
  color: #000;
  margin: 0 0 30px;
  input {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 1px solid #dadde6;
    border-radius: 10px;
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
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
  padding: 0 0 10px;
`;

const StLeftArea = styled.div``;
const StUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: #e1e1e1;
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

const StRightArea = styled.div``;

const StBtnArea = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StBtn = styled.button`
  width: 100px;
  height: 35px;
  font-weight: 500;
  text-align: center;
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
const StDescription = styled.p``;
const StTextArea = styled.textarea``;
const StCodeArea = styled.textarea``;

export default PostModify;
