import { useState, useEffect } from "react";
import { createContext } from "react";
import supabase from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export const dataContext = createContext();
export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // 로그인 관련 Hook
  const [isLogin, ChangeLogin] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  // 로그인 페이지에서 로그인을 하면 loginUserId에 로그인한 유저의 uid가 저장됨
  console.log("loginUserId=>", loginUserId);
  console.log("isLogin=>", isLogin);

  // 로그인과 관련된 동작이 일어나면 이 안에 있는 함수가 실행됨
  const { loginAuthData } = supabase.auth.onAuthStateChange(
    (event, session) => {
      // console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        setLoginUserId(session.user.id);

        // 로그인 상태 변경
        ChangeLogin(true);
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        setLoginUserId("");

        // 로그인 상태 변경
        ChangeLogin(false);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    }
  );
  return (
    <dataContext.Provider
      value={{
        users,
        setUsers,
        posts,
        setPosts,
        comments,
        setComments,
        isLogin,
        ChangeLogin,
        loginAuthData,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
