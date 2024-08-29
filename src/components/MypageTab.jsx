import { useState, useContext, useEffect } from "react";
import { dataContext } from "../contexts/DataContext";
import supabase from "../services/supabaseClient";
import styled from "styled-components";

const MypageTab = () => {
  const { users, setUsers, posts } = useContext(dataContext);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const { data, error } = await supabase.from("Users").select("*");
  //       if (error) {
  //         console.log("error =>", error);
  //       } else {
  //         console.log("user data =>", data);

  //         setUsers(data);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  const [activeTab, setActiveTab] = useState("작성한글");

  const OnClickTabHandler = (tabTitle) => {
    // e.preventDefault();
    setActiveTab(tabTitle);
  };

  return (
    <StMypageTabContainer>
      <StTabBox>
        <StTabItem
          className={`StTabItem ${activeTab === "작성한글" ? "active" : ""}`}
          onClick={() => {
            OnClickTabHandler("작성한글");
          }}
        >
          작성한글
        </StTabItem>
        <StTabItem
          className={`StTabItem ${activeTab === "댓글단글" ? "" : "active"}`}
          onClick={() => {
            OnClickTabHandler("댓글단글");
          }}
        >
          댓글단글
        </StTabItem>
      </StTabBox>
      <StPostingContentBox>
        <StPostingContent>내용1</StPostingContent>
        <StPostingContent>내용2</StPostingContent>
      </StPostingContentBox>
    </StMypageTabContainer>
  );
};

export default MypageTab;

//SECTION - style
const StMypageTabContainer = styled.div``;

const StTabBox = styled.ul`
  display: flex;
`;
const StTabItem = styled.li`
  flex: 1;
  text-align: center;
  cursor: pointer;
`;
const StPostingContentBox = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;
const StPostingContent = styled.div`
  width: 100%;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
`;
