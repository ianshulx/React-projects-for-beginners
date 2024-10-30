import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { nanoid } from "nanoid";
import { Task } from "./Task";

export const TaskList = () => {
  const [taskValue, setTaskValue] = useState("");
  const [count, setCount] = useState(0);
  const [addOrEdit, setAddOrEdit] = useState("Add New Task");
  const [idForEdit, setIdForEdit] = useState("");
  const [category, setCategory] = useState("");
  const [highPriority, setHighPriority] = useState(false);
  const inputRef = useRef();
  const taskCategories = [
    "Chores",
    "Household",
    "Work",
    "Casual",
    "Learning",
    "Health Care",
    "Next Week",
  ];
  const maxTaskLength = 125;
  const [allTasks, setAllTasks] = useState(
    localStorage.getItem("allTodos") !== null
      ? JSON.parse(localStorage.getItem("allTodos")).sort(
          (a, b) => b.dateTime - a.dateTime
        )
      : []
  );
  const [filterParam, setFilterParam] = useState(
    localStorage.getItem("filterParam") !== null
      ? JSON.parse(localStorage.getItem("filterParam"))
      : ""
  );
  const [sortParameter, setSortParameter] = useState(
    localStorage.getItem("sortParam") !== null
      ? JSON.parse(localStorage.getItem("sortParam"))
      : ""
  );
  const [showCompleted, setShowCompleted] = useState(
    localStorage.getItem("showCompleted") !== null
      ? JSON.parse(localStorage.getItem("showCompleted"))
      : false
  );

  // const taskSuggestions = () => {
  //   const suggestions = ["Meeting today at 11 AM", "Do laundry tomorrow"];
  //   setInterval(() => {
  //     for (const suggestion of suggestions) {
  //     }
  //   }, 2000);
  // };

  const sortBasedOnDate = useCallback(
    (arr, param) =>
      arr.sort((a, b) => {
        const dateA = moment(a[param], "YYYY-MM-DDTh:mm:ss A");
        const dateB = moment(b[param], "YYYY-MM-DDTh:mm:ss A");

        if (dateA.isBefore(dateB)) {
          return 1;
        } else if (dateA.isAfter(dateB)) {
          return -1;
        } else {
          return 0;
        }
      }),
    []
  );

  const sortingFunction = useCallback(
    (arr, sortParam) => {
      if (sortParam === "highPriority") {
        if (!arr.find((obj) => obj.highPriority)) {
          return sortBasedOnDate(arr);
        }
        return arr.sort((a, b) => b.highPriority - a.highPriority);
      }
      return sortBasedOnDate(arr, sortParam);
    },
    [sortBasedOnDate]
  );

  useEffect(() => {
    let sortingParam;
    if (sortParameter === "Recently Added" || sortParameter === "") {
      sortingParam = "dateTime";
    } else if (sortParameter === "Last Edited") {
      sortingParam = "lastEdited";
    } else if (sortParameter === "Priority") {
      sortingParam = "highPriority";
    }
    setAllTasks(
      localStorage.getItem("allTodos") !== null
        ? sortingFunction(
            JSON.parse(localStorage.getItem("allTodos")),
            sortingParam
          )
        : []
    );
  }, [count, sortParameter, sortingFunction]);

  useEffect(() => {
    if (!allTasks.length) {
      localStorage.clear();
      setFilterParam("");
      setSortParameter("");
      setShowCompleted(false);
    }
    inputRef.current.focus();
  }, [allTasks]);

  const handleAddNewTask = (event) => {
    event.preventDefault();
    if (!taskValue) {
      setTaskValue("");
      inputRef.current.focus();
      return;
    }
    if (addOrEdit === "Add New Task") {
      const newTask = {
        id: nanoid(),
        task: taskValue.trim(),
        highPriority: highPriority,
        category: !category ? "Uncategorized" : category,
        displayedDate: moment().format("MM/DD/YYYY"),
        displayedTime: moment().format("h:mm A"),
        dateTime: moment().format("YYYY-MM-DDTh:mm:ss A"),
        lastEdited: moment().format("YYYY-MM-DDTh:mm:ss A"),
        completed: false,
      };
      if (allTasks.length) {
        setAllTasks((prevTasks) => {
          if (category === "" || taskCategories.includes(category)) {
            localStorage.setItem(
              "allTodos",
              JSON.stringify([newTask, ...prevTasks])
            );
            return [newTask, ...prevTasks];
          }
          return [prevTasks];
        });
      } else {
        setAllTasks(() => {
          if (category === "" || taskCategories.includes(category)) {
            localStorage.setItem("allTodos", JSON.stringify([newTask]));
            return [newTask];
          }
          return [];
        });
      }
    } else {
      allTasks.some((task, index) => {
        const oldTask = task.task;
        const oldCategory = task.category;
        const oldPriority = task.highPriority;
        setHighPriority(task.highPriority);
        if (task.id === idForEdit) {
          task.task = taskValue.trim();
          task.category = category;
          task.highPriority = highPriority;
          if (
            task.task !== oldTask ||
            task.category !== oldCategory ||
            task.highPriority !== oldPriority
          ) {
            task.lastEdited = moment().format("YYYY-MM-DDTh:mm:ss A");
          }
          const updatedTask = task;
          setAllTasks((prevTasks) => {
            prevTasks.splice(index, 1, updatedTask);
            localStorage.setItem("allTodos", JSON.stringify(prevTasks));
            return prevTasks;
          });
          return true;
        }
        return false;
      });
    }
    setAddOrEdit("Add New Task");
    setCategory("");
    setTaskValue("");
    setHighPriority(false);
    setCount((prevCount) => prevCount + 1);
    inputRef.current.focus();
  };

  const handleStatusChange = (taskId) => {
    allTasks.some((task, index) => {
      if (taskId === task.id) {
        task.completed = !task.completed;
        const updatedTask = task;
        setAllTasks((prevTasks) => {
          prevTasks.splice(index, 1, updatedTask);
          localStorage.setItem("allTodos", JSON.stringify(prevTasks));
          return prevTasks;
        });
        setCount((prevCount) => prevCount + 1);

        return true;
      }
      return false;
    });
  };

  const handleTaskValueChange = (event) => {
    if (event.target.value.trim().length) {
      setTaskValue(event.target.value);
    } else {
      setTaskValue("");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    inputRef.current.focus();
  };

  const handlePriority = () => {
    setHighPriority((prevState) => !prevState);
    setCount((prevCount) => prevCount + 1);
    inputRef.current.focus();
  };

  const handleEditTask = (taskId) => {
    allTasks.some((task) => {
      if (taskId === task.id) {
        setTaskValue(task.task);
        setAddOrEdit("Save");
        setIdForEdit(taskId);
        setHighPriority(task.highPriority);
        setCategory(task.category);
        return true;
      }
      return false;
    });
    inputRef.current.focus();
  };

  const handleCanceEdit = () => {
    setAddOrEdit("Add New Task");
    setTaskValue("");
    setHighPriority(false);
    setCategory("");
    inputRef.current.focus();
  };

  const handleEscapePress = (event) => {
    if (addOrEdit === "Save" && event.key === "Escape") {
      setAddOrEdit("Add New Task");
      setTaskValue("");
      setHighPriority(false);
      setCategory("");
    }
  };

  const handleDeleteTask = (taskId) => {
    setAllTasks((prevTasks) => {
      const updatedAllTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("allTodos", JSON.stringify(updatedAllTasks));
      return updatedAllTasks;
    });
    setAddOrEdit("Add New Task");
  };

  const handleDeleteCompleted = () => {
    setAllTasks((prevTasks) => {
      localStorage.setItem(
        "allTodos",
        JSON.stringify(prevTasks.filter((obj) => !obj.completed))
      );
      return prevTasks.filter((obj) => !obj.completed);
    });
    setAddOrEdit("Add New Task");
  };

  const handleDeleteAll = () => {
    if (window.confirm("Delete the entire list?")) {
      setAllTasks(() => {
        return [];
      });
      setAddOrEdit("Add New Task");
      setTaskValue("");
    }
  };

  const handleFilterChange = (event) => {
    setFilterParam(() => {
      if (
        event.target.value === "" ||
        event.target.value === "All Tasks" ||
        [...taskCategories, "Uncategorized"].includes(event.target.value)
      ) {
        localStorage.setItem("filterParam", JSON.stringify(event.target.value));
        return event.target.value;
      }
      return "";
    });
    setAddOrEdit("Add New Task");
    setCategory("");
    setTaskValue("");
    setHighPriority(false);
    inputRef.current.focus();
  };

  const handleSortTasks = (event) => {
    setSortParameter(() => {
      if (
        event.target.value === "" ||
        event.target.value === "Recently Added" ||
        event.target.value === "Priority" ||
        event.target.value === "Last Edited"
      ) {
        localStorage.setItem("sortParam", JSON.stringify(event.target.value));
        return event.target.value;
      }
      return "";
    });
    setAddOrEdit("Add New Task");
    setCategory("");
    setTaskValue("");
    setHighPriority(false);
    setCount((prevCount) => prevCount + 1);
    inputRef.current.focus();
  };

  const handleCompleted = () => {
    setShowCompleted((prevState) => {
      localStorage.setItem("showCompleted", JSON.stringify(!prevState));
      return !prevState;
    });
    inputRef.current.focus();
  };

  const displayedTasks = () => {
    if (filterParam === "All Tasks" || filterParam === "") {
      return showCompleted
        ? allTasks.map((obj) => {
            if (!obj.completed) {
              return (
                <Task
                  key={obj.id}
                  obj={obj}
                  handleStatusChange={handleStatusChange}
                  handleEditTask={handleEditTask}
                  handleDeleteTask={handleDeleteTask}
                />
              );
            }
            return null;
          })
        : allTasks.map((obj) => {
            return (
              <Task
                key={obj.id}
                obj={obj}
                handleStatusChange={handleStatusChange}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            );
          });
    } else {
      const filteredTasks = allTasks.filter(
        (obj) => obj.category === filterParam
      );
      return filteredTasks.length ? (
        showCompleted ? (
          filteredTasks.map((obj) => {
            if (!obj.completed) {
              return (
                <Task
                  key={obj.id}
                  obj={obj}
                  handleStatusChange={handleStatusChange}
                  handleEditTask={handleEditTask}
                  handleDeleteTask={handleDeleteTask}
                />
              );
            }
            return null;
          })
        ) : (
          filteredTasks.map((obj) => {
            return (
              <Task
                key={obj.id}
                obj={obj}
                handleStatusChange={handleStatusChange}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            );
          })
        )
      ) : (
        <h5>No {filterParam} tasks!</h5>
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleAddNewTask}>
        <div className="form-container">
          <input
            ref={inputRef}
            autoComplete="off"
            autoFocus
            onChange={handleTaskValueChange}
            className="new-task-input"
            value={taskValue}
            placeholder={
              addOrEdit === "Add New Task"
                ? "Enter new task..."
                : "Edit Your Task..."
            }
            type="text"
            onKeyDown={handleEscapePress}
            maxLength={maxTaskLength}
          />
          <div className="task-category">
            {addOrEdit === "Add New Task" ? (
              <select
                value={category}
                onChange={handleCategoryChange}
                name="choose-category"
                className="choose-category-select"
              >
                <option value="">--Choose Category--</option>
                {taskCategories.map((taskCategory) => (
                  <option key={taskCategory} value={taskCategory}>
                    {taskCategory}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={category}
                onChange={handleCategoryChange}
                name="choose-category"
                className="choose-category-select"
              >
                {taskCategories.map((taskCategory) => (
                  <option key={taskCategory} value={taskCategory}>
                    {taskCategory}
                  </option>
                ))}
                <option value="Uncategorized">Uncategorized</option>
              </select>
            )}
          </div>
          <label className="high-priority-label" htmlFor="high-priority">
            High Priority?
          </label>
          <input
            id="high-priority"
            className="high-priority-input"
            type="checkbox"
            checked={highPriority}
            onChange={handlePriority}
          />
          <button className="add-task-button" type="submit">
            {addOrEdit}
          </button>
          {addOrEdit === "Save" && (
            <button
              className="cancel-edit-button"
              style={{ marginLeft: 0 }}
              onClick={handleCanceEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {!allTasks.length ? (
        <h5>Nothing yet!</h5>
      ) : (
        <div>
          <div className="operative-buttons">
            <div className="filter-sort-container">
              <div className="task-category">
                <select
                  value={filterParam}
                  onChange={handleFilterChange}
                  name="filter-category"
                  className="filter-category-select"
                >
                  <option value="">--Filter By--</option>
                  <option value="All Tasks">All Tasks</option>
                  {taskCategories.map((taskCategory) => (
                    <option key={taskCategory} value={taskCategory}>
                      {taskCategory}
                    </option>
                  ))}
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>
              <div className="sort-tasks">
                <select
                  value={sortParameter}
                  onChange={handleSortTasks}
                  name="sort-task"
                  className="sort-tasks-select"
                >
                  <option value="">--Sort By--</option>
                  <option value="Recently Added">Recently Added</option>
                  <option value="Priority">Priority</option>
                  <option value="Last Edited">Last Edited</option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="show-completed-button"
                onClick={handleCompleted}
              >
                {showCompleted ? "Show Completed" : "Hide Completed"}
              </button>
            </div>
          </div>
          {displayedTasks()}
          <div className="delete-completed-container">
            <div>
              <button
                className="delete-completed-button"
                onClick={handleDeleteCompleted}
              >
                Delete Completed
              </button>
            </div>
            <div>
              <button className="delete-all-button" onClick={handleDeleteAll}>
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
