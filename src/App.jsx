import Router from "./shared/Router"
import GlobalStyle from "./components/GlobalStyle"
import { PostProvider } from "./contexts/PostContext"

function App() {
  return (
    <>
    <GlobalStyle/>
      <PostProvider>        
        <Router />
      </PostProvider>
    </>
  )
}

export default App
