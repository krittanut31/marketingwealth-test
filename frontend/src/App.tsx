import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, ProductDetail, PageNotFound, Signin, Cart } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/product/:id"} element={<ProductDetail />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
