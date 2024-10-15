import React from "react";
import "./App.css";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div className="app">
      <h1 className="heading">
        Welcome to <span className="app-name">Tasklear</span>
      </h1>
      <p className="sub-heading">Manage tasks on the go!</p>
      <TaskList />
    </div>
  );
}

export default App;
