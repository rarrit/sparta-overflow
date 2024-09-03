import { createGlobalStyle } from 'styled-components'

/* Layout */
const maxWidth = '1600px';

/* Color */ 
const mainColor = '#000';
const activeColor = 'red';
const subColor = '#e1e1e1';

const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'HSGooltokki';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/HSGooltokki.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  } */  
  * {
    /* font-family: 'HSGooltokki', sans-serif !important; */
    box-sizing: border-box;
  }
  .toastui-editor-contents p {font-size:18px}
`



export default GlobalStyle
