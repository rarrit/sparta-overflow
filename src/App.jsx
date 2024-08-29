import Router from "./shared/Router"
import GlobalStyle from "./components/GlobalStyle"
import { PostProvider } from "./contexts/PostContext"
import { DataProvider } from "./contexts/DataContext"

function App() {
  return (
    <>
      <GlobalStyle/>            
      <DataProvider>
        <PostProvider>            
          <Router />        
        </PostProvider>
      </DataProvider>      
    </>
  )
}

export default App
