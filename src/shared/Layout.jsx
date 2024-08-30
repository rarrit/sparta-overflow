import { TeamInfo } from "../assets/js/teamInfo";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/image/logo.jpeg";


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
          <StSearchForm>
            <div className="search">
              <input type="text" placeholder="검색어를 입력해주세요."/>
              <button type="button">검색</button>
            </div>            
          </StSearchForm>
          <StBtnArea>
            <Link to="/login" className="btnLineBlack">Log in</Link>
            <Link to="/join" className="btnBlack">Sign up</Link>
          </StBtnArea>
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
          <div className="teamName">말하는 <b>숟가락들</b></div>
          <div className="teamInfo">
            {
              TeamInfo.map(info => {
                return (
                  <div key={info} className="dlBox">
                    <dl>
                      <dt>{info.name}</dt>
                      <dd>
                        <a href={info.github} target="_blank">GitHub</a>
                        <a href={info.blog} target="_blank">Blog</a>
                      </dd>
                    </dl>
                  </div>
                )
              })
            }
          </div>
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
  padding:10px 0;
  background:#fff;
  .inner {
    display:flex;
    align-items:center;
    width:100%;
    max-width:1660px;
    margin:0 auto;
    padding:0 30px;
  }
`;
const StLogo = styled.div`  
  a {
    display:flex;
    align-items:center;    
    width:100%;
    max-width:355px;
    font-size:32px;
    color:#656565;
  }  
  img {
    height:60px;
  }
  span {
    color:#000;
    font-weight:900;
    margin-left:5px;
  }
`;
const StSearchForm = styled.div`  
  flex:1;
  padding:0 10px 0 20px;
  .search {
    position:relative;
    height:50px;
    border:1px solid #959595;
    border-radius:10px;
    overflow: hidden;
    padding:0 15px;
    input {
      width:100%;
      height:100%;
    }
  }
`;
const StBtnArea = styled.div`
  display:flex;
  align-items:center;
  width:150px;
  gap:10px;
  a {
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    max-width: 200px;
    height:50px;
    font-size:16px;
    font-weight:500;
    border-radius:10px;  
    cursor:pointer;
    &.btnLineBlack {
      color:#000;
      border:1px solid #000;
    }
    &.btnBlack {
      color:#fff;
      background:#000;
    }
  }
`;


const StWrap = styled.div`
  padding-top:85px;
`;
const StContainer = styled.div`
  width:100%;
  max-width:1660px;
  margin:0 auto;
  padding:0 30px;
`;
const StContents = styled.div`
  min-height:600px;
`;
const StFooter = styled.footer`
  border-top:1px solid #000;
  padding:30px 0;
  .inner {
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    gap:20px;
    width:100%;
    max-width:1660px;
    margin:0 auto;
    padding:0 30px;
    .teamName {
      font-size:22px;
      font-weight: 500;
      b {
        font-weight: bold;
      }
    }
    .teamInfo {
      display:flex;
      align-items:center;
      justify-content:center;
      gap:10px;
      .dlBox {
        position:relative;
        padding-bottom:50px;
        &:before {
          content:'';
          position:absolute;
          left:50%;
          bottom:0;
          width:1px;
          height:50px;
          background:#959595;
          transform:translateX(-50%);
        }
        dl {
          border:1px solid #959595;
          border-radius:100%;    
          overflow:hidden;       
          dt {
            font-size:14px;
            color:#000;
            text-align:center;          
            background:#e5e5e5;
            border-bottom:1px solid #959595;         
            padding:10px 30px;
          }
          dd {
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            min-height: 80px;
            a {
              cursor:pointer;
              &:first-child {
                position:relative;
                &:after {
                  content:'';
                  display:block;
                  width:1px;
                  height:15px;
                  background:#959595;
                  margin:3px auto;
                }
              }
            }          
          }
        }
      }
    }
  }
`;

export default Layout

// 포스트 아이디: 1

