import { TeamInfo } from "../assets/js/teamInfo";
import { Link, matchPath, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/image/logo.jpeg";
import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLogin,
    logout,
    searchData,
    setSearchData,
    searchFocused,
    setSearchFocused,
  } = useContext(dataContext);

  const hidePaths = ["/", "/search"];
  // 경로 패턴이 일치하는지 확인
  const shouldHideTag = hidePaths.some((path) =>
    matchPath(path, location.pathname)
  );

  const isSpecificPage =
    location.pathname === "/" || location.pathname === "/Search";

  const inputStyle = searchFocused ? { width: "100%" } : { width: "100px" };
  const closeButtonStyle = searchFocused
    ? { display: "block" }
    : { display: "none" };
  const searchFlex = isSpecificPage ? { flex: "1" } : { flex: "none" };

  const FocusSearchPopup = (e) => {
    e.preventDefault();
    navigate("/Search");
    setSearchData(e.target.value);
  };

  return (
    <>
      <StHeader>
        <div className="inner">
          <StLogo
            onClick={() => {
              setSearchData("");
              setSearchFocused(false);
            }}
          >
            <Link to="/">
              <img src={logo} />
              spoon <span>overflow</span>
            </Link>
          </StLogo>

          <StBtnArea style={searchFlex}>
            {shouldHideTag && (
              <StSearchForm>
                <div className="search">
                  <StInput
                    type="text"
                    value={searchData}
                    placeholder="Search..."
                    onChange={FocusSearchPopup}
                    onFocus={() => setSearchFocused(true)}
                    style={inputStyle}
                  />
                  <StSearchClose
                    style={closeButtonStyle}
                    onClick={() => {
                      setSearchFocused(false);
                      setSearchData("");
                    }}
                  >
                    <X />
                  </StSearchClose>
                </div>
                <button type="button" className="searchIcon">
                  <Search />
                </button>
              </StSearchForm>
            )}

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
                  Join
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

export default Layout;

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
  display: flex;
  padding: 0 10px 0 20px;
  width: 100%;
  justify-content: flex-end;
  & .search {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;
const StSearchClose = styled.div`
  /* display: ${(props) => (props.searchFocused ? "block" : "none")}; */
  cursor: pointer;
`;

const StInput = styled.input`
  position: relative;
  height: 50px;
  border-bottom: 3px solid #000;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 15px;
  /* width: ${(props) => (props.searchFocused ? "100%" : "100px")}; */
  transition: all 1s;
`;
const StBtnArea = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  gap: 10px;
  /* ${(props) => props.isSpecificPage && `flex: 1;`} */

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100px;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    padding: 0 20px;
    cursor: pointer;
    &.btnLineBlack {
      color: #000;
      border: 3px solid #000;
    }
    &.btnBlack {
      color: #fff;
      background: #000;
    }
  }
  & .searchIcon {
    padding: 0 10px;
    width: auto;
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

// 포스트 아이디: 1
