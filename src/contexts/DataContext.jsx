import { useState, useEffect } from "react";
import { createContext } from "react";
import supabase from "../services/supabaseClient";

export const dataContext = createContext();
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // 로그인 관련 Hook
  const [isLogin, changeLogin] = useState(false);
  const [loginId, setLoginId] = useState("");
  // 로그인 페이지에서 로그인을 하면 loginUserInfo에 로그인한 유저의 정보가 저장됨
  const [loginUserInfo, setLoginUserInfo] = useState("");

  // 로그인한 유저 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("userinfo")
        .select()
        .eq("id", loginId);
      if (error) {
      } else {
        // 로그인 시 사용자 정보 저장
        if (isLogin) {
          setLoginUserInfo(...data);
        }
      }
    };
    fetchData();
  }, [isLogin]);

  // 로그인과 관련된 동작이 일어나면 이 안에 있는 함수가 실행됨
  const { loginAuthData } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        // 로그인한 id
        setLoginId(session.user.id);
        // 로그인 상태 변경
        changeLogin(true);
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        // 로그인 상태 변경
        changeLogin(false);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    }
  );
  // 로그아웃
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃이 실패했습니다");
    } else {
      setLoginUserInfo([]);
      alert("로그아웃되었습니다");
    }
  };

  return (
    <dataContext.Provider
      value={{
        posts,
        setPosts,
        comments,
        setComments,
        isLogin,
        changeLogin,
        loginAuthData,
        logout,
        loginUserInfo,
        setLoginUserInfo,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
