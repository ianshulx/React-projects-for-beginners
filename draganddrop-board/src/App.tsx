import { useEffect, useState } from "react";
import "./App.css";
import { ColumnType } from "./types/columnTypes";
import { TaskType } from "./types/taskTypes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Column } from "./components/Column";

const cols: ColumnType[] = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Done" },
];

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskText, setTasktext] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<number>(1);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskText.trim() === "") return;
    setTasks([
      ...tasks,
      { text: taskText, columnId: selectedColumn, uid: Date.now() },
    ]);
    setTasktext("");
  };

  useEffect(() => {
    console.log(tasks); // Log tasks whenever they change
  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-200 p-4">
        <div className="lg:flex lg:justify-between mx-10">
          <h2 className=" mt-4 lg:text-3xl lg:text-start text-xl text-center">
            Drag & Drop Board
          </h2>
          <form
            onSubmit={addTask}
            className="p-4 flex flex-wrap justify-center gap-2"
          >
            <input
              type="text"
              placeholder="Your Task"
              className="p-2 lg:w-80"
              value={taskText}
              onChange={(e) => setTasktext(e.target.value)}
            ></input>
            <select
              className="ml-2 p-2"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(Number(e.target.value))}
            >
              {cols.map((col) => (
                <option className="p-2" key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
            <button
              className="ml-2 p-2 rounded-lg bg-blue-900 text-white"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </div>
        {/*grid*/}
        <div>
          <div className="lg:grid grid-cols-3 lg:gap-4 p-4 flex flex-wrap gap-6">
            {cols.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                setTasks={setTasks}
              />
            ))}
          </div>
        </div>
      </div>


    </DndProvider>
  );
}

export default App;
