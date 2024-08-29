import logo from "../assets/image/logo.jpeg";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header(){
  return (
    <>
      <StHeader>
        <div className="inner">
          <StLogo>
            <Link to="/">
              <img src={logo} />
              sparta <span>overflow</span>
            </Link>
          </StLogo>
        </div>
      </StHeader>
    </> 
  )
}

function Footer(){
  return (
    <>
      <StFooter>
        <div className="inner">
          푸터
        </div>
      </StFooter>
    </>
  )
}


const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <StWrap id="wrap">
          <StContainer id="container">
            <StContents id="contents">
              { children }
            </StContents>
          </StContainer>
        </StWrap>
      <Footer />
    </>
  )
}


const StHeader = styled.header`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  border-bottom:1px solid #111;
  .inner {
    width:100%;
    max-width:1600px;
    margin:0 auto;
  }
`;
const StLogo = styled.div`

`;
const StWrap = styled.div`
  
`;
const StContainer = styled.div`
  
`;
const StContents = styled.div`

`;
const StFooter = styled.footer`

`;

export default Layout
