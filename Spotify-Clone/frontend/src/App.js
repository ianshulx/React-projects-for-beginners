import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SongState from "./context/SongState";
import BottomBar from "./components/BottomBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <SongState>
        <Router>
          <div className="flex h-[calc(100vh-theme(space.24))]">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route exact path="/search" element={<SearchPage />}></Route>
            </Routes>
          </div>
          <BottomBar />
        </Router>
      </SongState>
    </>
  );
}

export default App;
