import { useState, createContext } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/ProfileInfo";
import MypageTab from "../components/MypageTab";

const Mypage = () => {
  return (
    <StMypageContainer>
      <section>
        <ProfileInfo />
      </section>
      <section>
        <MypageTab />
      </section>
    </StMypageContainer>
  );
};

export default Mypage;

const StMypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1060px;
  width: 100%;
  border: 1px solid;
  margin: 0 auto;
`;
