import React from "react";
import { useLocation } from "react-router-dom";
import TuiEditor from "../components/TuiEditor";

const PostModify = () => {
  // useLocation 을 사용해서 detail 페이지에서 useNavigate를 통해 전달한 값을 받아옴
  const location = useLocation();
  const { title, description } = location.state || {};

  return (
    <>
    <TuiEditor/>
    </>
  )
};

export default PostModify;
