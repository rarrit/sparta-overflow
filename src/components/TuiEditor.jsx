// TuiEditor.jsx
import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const TuiEditor = ({ description }) => {
  const editorRef = useRef();

  const handleClick = () => {
    const editorInstance = editorRef.current.getInstance();
    console.log(editorInstance.getMarkdown());
  };

  console.log("testestst =>", description);

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
      />
      <button onClick={handleClick}>Get Markdown</button>
    </div>
  );
};

export default TuiEditor;
