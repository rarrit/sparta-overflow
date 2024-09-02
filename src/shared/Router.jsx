import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import PostDetail from "../pages/PostDetail";
import PostWrite from "../pages/PostWrite";
import CodeBlockExample from "../pages/CodeBlockExample";
import SupaBaseExample from "../pages/SupaBaseExample";
import PostModify from "../pages/PostModify";
import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import Search from "../pages/Search";

const Router = () => {
  const { isLogin } = useContext(dataContext);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 로그인 + 비로그인 상태에서 접속 가능 */}
          <Route path="/" element={<Main />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/detail/:id" element={<PostDetail />} />
          <Route path="/example1" element={<CodeBlockExample />} />
          <Route path="/example2" element={<SupaBaseExample />} />
          {/* 로그인/비로그인 상태에서 접속 가능 */}
          {isLogin ? (
            <>
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/write/:id" element={<PostWrite />} />
              <Route path="/modify/:id" element={<PostModify />} />
            </>
          ) : (
            <Route path="/sign" element={<Login />} />
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
