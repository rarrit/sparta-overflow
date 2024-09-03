import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import PostDetail from "../pages/PostDetail";
import PostModify from "../pages/PostModify";
import { useContext } from "react";
import { dataContext } from "../contexts/DataContext";
import Search from "../pages/Search";
import PostRegister from "../pages/PostRegister";

const getLogin = () => {
  const { isLogin } = useContext(dataContext);
  return isLogin;
};

const AuthRoute = () => {
  if (getLogin()) {
    alert("이미 로그인된 상태입니다");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const PrivateRoute = () => {
  if (!getLogin()) {
    alert("로그인을 해주세요");
    return <Navigate to="/sign#login" />;
  }
  return <Outlet />;
};
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 로그인 + 비로그인 상태에서 접속 가능 */}
          <Route path="/" element={<Main />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/detail/:id" element={<PostDetail />} />
          {/* 로그인 상태에서 접속 가능 */}
          <Route element={<PrivateRoute />}>
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/register" element={<PostRegister />} />
            <Route path="/modify/:id" element={<PostModify />} />
          </Route>
          {/* 비로그인 상태애서 접속 가능 */}
          <Route element={<AuthRoute />}>
            <Route path="/sign" element={<Login />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
