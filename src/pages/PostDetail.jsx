import { useContext } from "react"
import { dataContext } from "../contexts/DataContext";
import { postContext } from "../contexts/PostContext"
import styled from "styled-components"
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const PostDetail = () => {
  const { id } = useParams();
  console.log("id => ",id);
  const { loginUser } = useContext(dataContext);
  // filter


  console.log("user=>", loginUser);  

  return (
    <StContainer>
      {/* 채택 여부 */}
      <StState/>

      {/* 타이틀 */}
      <StTitle></StTitle>

      {/* 상세정보 */}
      <StInfo> 
        <StLeftArea>
          <StUser></StUser>
          <StDate></StDate>
        </StLeftArea>
        <StRightArea>
          <StBtn>등록,수정,삭제</StBtn>
        </StRightArea>
      </StInfo>

      {/* 글 영역 */}
      <StDescArea>
        <StTextArea></StTextArea>
        <StCodeArea></StCodeArea>
      </StDescArea>

    </StContainer>
  )
}

const StContainer = styled.div`
  
`


const StState = styled.div`
  
`


const StTitle = styled.h2`

`;


const StInfo = styled.div`
  
`


const StLeftArea = styled.div`
  
`;
const StUser = styled.div`
  
`
const StDate = styled.div`
  
`


const StRightArea = styled.div`
  
`;
const StBtnArea = styled.div`
  
`
const StBtn = styled.button`
  
`

const StDescArea = styled.div`

`;
const StTextArea = styled.textarea`

`;
const StCodeArea = styled.textarea`
  
`;




export default PostDetail
