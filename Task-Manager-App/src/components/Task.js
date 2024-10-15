import React from "react";

export const Task = (props) => (
  <div className="task">
    <div className="status-content-container">
      <div className="task-status">
        <input
          className="task-status-input"
          id={props.obj.id}
          onChange={() => props.handleStatusChange(props.obj.id)}
          checked={props.obj.completed}
          type="checkbox"
        />
      </div>
      <div className="task-date-container">
        <label
          htmlFor={props.obj.id}
          style={{
            textDecoration: props.obj.completed && "line-through",
          }}
          className="task-content"
        >
          {props.obj.task}
        </label>

        <div className="task-date">{`${props.obj.displayedTime}, ${props.obj.displayedDate}`}</div>
      </div>
    </div>
    <div className="edit-delete-container">
      <img
        className="priority-img"
        alt="high-priority"
        src="priority.png"
        height={props.obj.highPriority ? 20 : 0}
        width={props.obj.highPriority ? 20 : 0}
        style={{ filter: "invert(0.1)" }}
      />

      <img
        onClick={() => props.handleEditTask(props.obj.id)}
        className="edit-delete"
        alt="edit"
        src="edit.png"
        height={20}
        width={20}
      />
      <img
        onClick={() => props.handleDeleteTask(props.obj.id)}
        className="edit-delete"
        alt="delete"
        src="delete.png"
        height={20}
        width={20}
        style={{ filter: "invert(0)" }}
      />
    </div>
  </div>
);
