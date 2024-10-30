import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AiStory from "./components/AiStory.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <App />
  )
}

const AI = () => {
  return (
    <AiStory />
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/ai-story-generator" element={ <AiStory /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
