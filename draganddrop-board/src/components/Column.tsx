import { useDrop } from "react-dnd";
import { ColumnProps } from "../types/columnTypes";
import { Task } from './Task';
import { TaskType } from "../types/taskTypes";

export const Column:React.FC<ColumnProps> = ({title, tasks, setTasks,id}) => {

    const [ {isOver}, drop] = useDrop<TaskType, void, { isOver: boolean }>(()=>({
        accept: 'TASK',
        drop: (item:{uid:number})=>{
            setTasks((prevTasks)=>{

                return prevTasks.map((task)=>
                    task.uid === item.uid ? {...task, columnId:id} : task
                )
            }
            );
        } ,
        collect: (monitor)=>({
            isOver: monitor.isOver(), 
        }),
    }));
  return (
    <>
      <div className={`border  border-gray-400 w-full p-4 rounded ${isOver ? 'bg-green-100' : 'bg-slate-100'}`} ref={drop}>
        <h2 className="text-center font-medium">{title}</h2>
        <hr className="bg-gray-400 my-2 h-0.5"></hr>
        {
            tasks.sort((a,b)=>a.uid-b.uid).map((task)=>(
                <Task text={task.text} columnId={task.columnId} uid={task.uid} key={task.uid}/>
            ))
        }
      </div>
    </>
  );
};
