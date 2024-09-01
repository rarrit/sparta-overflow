// 코드블럭 공식 문서 https://highlightjs.org/#usage
// 코드블럭 Test https://jenny0520.tistory.com/160
import hljs from "highlight.js";
// import "highlight.js/styles/default.min.css";
import { railscasts } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import "highlight.js/styles/classic-light.css";
import { useEffect } from "react";
import { useRef } from "react";
const CodeBlockExample = () => {
  const testRef = useRef(null);
  // 코드블럭
  useEffect(() => {
    hljs.highlightAll();

    // 하이라이팅이 완료된 후에 텍스트를 가져옴
    setTimeout(() => {
      if (testRef.current) {
        console.log("Code Block Text:", testRef.current.innerText);
      }
    }, 100); 

  }, []);



  return (
    <>

      <pre>
        <code ref={testRef} style={railscasts}>
          {`
            const test = '';
            const handleAdd = () => {
              console.log(test);
            }
          `}
        </code>
      </pre>
    </>
  );
};

export default CodeBlockExample;
