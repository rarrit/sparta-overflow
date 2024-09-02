import { TeamInfo } from "../assets/js/teamInfo";
import { Link, matchPath, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/image/logo.jpeg";
import { useState, useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { isLogin, logout, searchData, setSearchData } =
    useContext(dataContext);

  const hidePaths = ["/", "/search"];
  // 경로 패턴이 일치하는지 확인
  const shouldHideTag = hidePaths.some((path) =>
    matchPath(path, location.pathname)
  );

  const FocusSearchPopup = (e) => {
    e.preventDefault();
    navigate("/Search");
    setSearchData(e.target.value);
  };

  return (
    <>
      <StHeader>
        <div className="inner">
          <StLogo>
            <Link to="/">
              <img src={logo} />
              spoon <span>overflow</span>
            </Link>
          </StLogo>
          {shouldHideTag && (
            <StSearchForm>
              <div className="search">
                <input
                  type="text"
                  value={searchData}
                  placeholder="검색어를 입력해주세요."
                  onChange={FocusSearchPopup}
                />
                <button type="button">검색</button>
              </div>
            </StSearchForm>
          )}

          <StBtnArea>
            {isLogin ? (
              <>
                <button onClick={() => logout()} className="btnLineBlack">
                  Logout
                </button>
                <Link to="/mypage" className="btnBlack">
                  MyPage
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign#login" className="btnLineBlack">
                  Log in
                </Link>
                <Link to="/sign#signup" className="btnBlack">
                  Sign up
                </Link>
              </>
            )}
          </StBtnArea>
        </div>
      </StHeader>
    </>
  );
}

function Footer() {
  return (
    <>
      <StFooter>
        <div className="inner">
          <div className="teamName">
            말하는 <b>숟가락들</b>
          </div>
          <div className="teamInfo">
            {TeamInfo.map((info, index) => {
              return (
                <div key={index} className="dlBox">
                  <dl>
                    <dt>{info.name}</dt>
                    <dd>
                      <a href={info.github} target="_blank">
                        GitHub
                      </a>
                      <a href={info.blog} target="_blank">
                        Blog
                      </a>
                    </dd>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </StFooter>
    </>
  );
}

const Layout = ({ children }) => {
  const { isLogin, logout } = useContext(dataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const hidePaths = ["/register", "/modify/:id", "/detail/:id"];
  // 경로 패턴이 일치하는지 확인
  const shouldHideTag = hidePaths.some((path) =>
    matchPath(path, location.pathname)
  );
  return (
    <>
      <Header />
      <StWrap id="wrap">
        <StContainer id="container">
          <StContents id="contents">
            {children}
            {isLogin && !shouldHideTag && (
              <StFixedBtnArea>
                <button type="button" onClick={() => navigate(`register`)}>
                  글쓰기
                </button>
              </StFixedBtnArea>
            )}
          </StContents>
        </StContainer>
      </StWrap>
      {!shouldHideTag && <Footer />}
    </>
  );
};

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #111;
  padding: 10px 0;
  background: #fff;
  z-index: 999;
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1660px;
    margin: 0 auto;
    padding: 0 30px;
  }
`;
const StLogo = styled.div`
  a {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 355px;
    font-size: 32px;
    color: #656565;
  }
  img {
    height: 60px;
  }
  span {
    color: #000;
    font-weight: 900;
    margin-left: 5px;
  }
`;
const StSearchForm = styled.div`
  flex: 1;
  padding: 0 10px 0 20px;
  .search {
    position: relative;
    height: 50px;
    border: 1px solid #959595;
    border-radius: 10px;
    overflow: hidden;
    padding: 0 15px;
    input {
      width: 100%;
      height: 100%;
    }
  }
`;
const StBtnArea = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  gap: 10px;
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 200px;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    &.btnLineBlack {
      color: #000;
      border: 1px solid #000;
    }
    &.btnBlack {
      color: #fff;
      background: #000;
    }
  }
`;

const StWrap = styled.div`
  padding-top: 85px;
`;
const StContainer = styled.div`
  width: 100%;
  max-width: 1660px;
  margin: 0 auto;
  padding: 0 30px;
`;
const StContents = styled.div`
  min-height: 600px;
`;
const StFooter = styled.footer`
  border-top: 1px solid #000;
  padding: 30px 0 0;
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1660px;
    margin: 0 auto;
    padding: 0 30px;
    .teamName {
      font-size: 22px;
      font-weight: 500;
      b {
        font-weight: bold;
      }
    }
    .teamInfo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .dlBox {
        position: relative;
        padding-bottom: 50px;
        &:before {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 1px;
          height: 50px;
          background: #959595;
          transform: translateX(-50%);
        }
        dl {
          border: 1px solid #959595;
          border-radius: 100%;
          overflow: hidden;
          dt {
            font-size: 14px;
            color: #000;
            text-align: center;
            background: #e5e5e5;
            border-bottom: 1px solid #959595;
            padding: 10px 30px;
          }
          dd {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80px;
            a {
              cursor: pointer;
              &:first-child {
                position: relative;
                &:after {
                  content: "";
                  display: block;
                  width: 1px;
                  height: 15px;
                  background: #959595;
                  margin: 3px auto;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const StFixedBtnArea = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
    color: #fff;
    border: 1px solid #111;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.15s ease;
    background: #111;
    &:hover {
      color: #fff;
      background: #111;
    }
  }
`;

export default Layout;

// 포스트 아이디: 1
