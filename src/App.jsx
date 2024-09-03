import Router from "./shared/Router";
import GlobalStyle from "./components/GlobalStyle";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <>
      <GlobalStyle />
      <DataProvider>
        <Router />
      </DataProvider>
    </>
  );
}

export default App;
