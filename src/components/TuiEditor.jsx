// TuiEditor.jsx
import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const TuiEditor = () => {
  const editorRef = useRef();

  const handleClick = () => {
    const editorInstance = editorRef.current.getInstance();
    console.log(editorInstance.getMarkdown());
  };

  return (
    <div>
      <Editor
        initialValue="Hello, Toast UI Editor!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
      />
      <button onClick={handleClick}>Get Markdown</button>
    </div>
  );
};

export default TuiEditor;