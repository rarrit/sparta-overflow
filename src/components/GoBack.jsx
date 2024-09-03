import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <StBackContainer>
      <StBackButton onClick={() => navigate(-1)}>
        <ArrowLeft />
        <p>Back</p>
      </StBackButton>
    </StBackContainer>
  );
};

export default GoBack;

const StBackContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 20px;

  & p {
    font-size: 18px;
  }
`;
