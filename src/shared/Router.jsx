import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Join from '../pages/Join'
import Mypage from '../pages/Mypage'
import PostDetail from '../pages/PostDetail'
import PostWrite from '../pages/PostWrite'
import CodeBlockExample from '../pages/CodeBlockExample'
import SupaBaseExample from '../pages/SupaBaseExample'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/join" element={<Join/>}/>
          <Route path="/mypage" element={<Mypage/>}/>
          <Route path="/detail" element={<PostDetail/>}/>
          <Route path="/write" element={<PostWrite/>}/>

          <Route path="/example1" element={<CodeBlockExample/>}/>
          <Route path="/example2" element={<SupaBaseExample/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
