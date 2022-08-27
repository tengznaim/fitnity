import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import CreateActivity from "./components/CreateActivity/CreateActivity";
import SportsOfFame from "./components/SportsOfFame/SportsOfFame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/create-activity" element={<CreateActivity />}></Route>
      <Route path="/sports-of-fame" element={<SportsOfFame />}></Route>
    </Routes>
  );
}

export default App;
