// TuiEditor.jsx
import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect } from "react";

const TuiEditor = ({ description, onChange }) => {
  const editorRef = useRef();

  // const handleClick = () => {
  //   const editorInstance = editorRef.current.getInstance();
  //   console.log(editorInstance.getMarkdown());
  // };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(description || '');
    }
  }, [description]);

  const handleChange = () => {
    const data = editorRef.current.getInstance().getMarkdown(); // 여기서 에디터 내용 가져옴
    onChange(data); // 부모 컴포넌트로 에디터 내용을 전달
  };


  return (
    <div>
      {/*
        옵션              타입              설명
        initialValue	   string	          에디터의 초기값. 수정 기능 구현시 유용
        initialEditType	 string	          에디터 초기 타입 설정. markdown, wysiwyg 중 선택 가능
        autofocus	       boolean = true	  true일 경우 자동으로 에디터에 포커스 설정
        toolbarItems	   array	          툴바 아이템
        hideModeSwitch	 boolean = false  markdown / wysiwyg 스위치 탭 숨김
        height	         string = '300px'	에디터의 높이 값. ex) '300px', '100%', 'auto'
        hooks	           Object	          addImageBlobHook - 이미지 업로드에 사용되는 훅 설정
      */}
      <Editor
        initialValue={description ?? ""}
        previewStyle="vertical"
        height="400px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        onChange={handleChange} // 에디터 변경 시 handleChange 호출
      />
      {/* <button onClick={handleClick}>Get Markdown</button> */}
    </div>
  );
};

export default TuiEditor;
