import { TaskType } from "./taskTypes";

export interface ColumnType{
    id:number;
    title:string;
   
}

export interface ColumnProps extends ColumnType{
     tasks:TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}