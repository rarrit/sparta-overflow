import { useState, createContext } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/ProfileInfo";
import MypageTab from "../components/MypageTab";

const Mypage = () => {
<<<<<<< HEAD
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
=======
  return <>마이페이지</>;
};

export default Mypage;
>>>>>>> 3a94be13011a5cd3a4940c2f1c0d461e384d5dde
