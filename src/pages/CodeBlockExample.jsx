
// 코드블럭 공식 문서 https://highlightjs.org/#usage
// 코드블럭 Test https://jenny0520.tistory.com/160
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
const CodeBlockExample = () => {

  // 코드블럭
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <pre>
        <code>
          {
            `
            <div className>
              hi
            </div>`
          }
        </code>
      </pre>
    </>
  )
}

export default CodeBlockExample
