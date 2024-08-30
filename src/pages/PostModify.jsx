import React from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useRef } from "react";
import { useEffect } from "react";


const PostModify = () => {
  // useLocation 을 사용해서 detail 페이지에서 useNavigate를 통해 전달한 값을 받아옴
  const location = useLocation();
  const quillRef = useRef(null);
  const { title, description } = location.state || {};
  

  useEffect(() => {
    if(quillRef.current) console.log(quillRef)
  })

  return <div ref={quillRef}><ReactQuill theme="snow"/></div>;
};

export default PostModify;
