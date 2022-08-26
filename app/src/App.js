import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search" element={<Search />}></Route>
    </Routes>
  );
}

export default App;
