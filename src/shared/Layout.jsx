import styled from "styled-components"

function Header(){
  return (
    <>
      <StHeader>
        <div className="inner">
          헤더
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
