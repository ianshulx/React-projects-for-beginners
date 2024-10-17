import { useDrag } from "react-dnd";
import { TaskType } from "../types/taskTypes";

export const Task: React.FC<TaskType> = ({ text, uid }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { uid },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <>
      <div
        className={`border border-gray-400 p-2 my-1 rounded bg-slate-300 ${
          isDragging ? "bg-blue-200" : ""
        }`}
        ref={drag}
      >
        {text}
        <br></br>
        <span className="text-gray-500 text-sm text-right">
          {new Date(uid).toLocaleString()}
        </span>
      </div>
    </>
  );
};
