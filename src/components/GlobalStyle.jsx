import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'BMDOHYEON';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  * {
    font-family: 'BMDOHYEON', sans-serif !important;
    box-sizing: border-box;
  }
  .toastui-editor-contents p {font-size:18px}
`;

export default GlobalStyle;
