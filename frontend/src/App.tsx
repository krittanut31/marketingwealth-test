import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, History, PageNotFound, Signin } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/History"} element={<History />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
