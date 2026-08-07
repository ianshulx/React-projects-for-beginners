import { useEffect, useMemo, useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Solve Two Sum",
    category: "DSA",
    difficulty: "Easy",
    completed: true,
  },
  {
    id: 2,
    title: "Revise Java OOP Concepts",
    category: "Java",
    difficulty: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Practice SQL Joins",
    category: "Database",
    difficulty: "Medium",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("placementPrepTasks");

    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Easy");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("placementPrepTheme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("placementPrepTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "placementPrepTheme",
      darkMode ? "dark" : "light",
    );

    document.body.className = darkMode ? "dark-theme" : "";
  }, [darkMode]);

  const addTask = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      category,
      difficulty,
      completed: false,
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
    setTaskTitle("");
    setCategory("DSA");
    setDifficulty("Easy");
  };

  const toggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  const clearCompletedTasks = () => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => !task.completed),
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Pending" && !task.completed);

      const matchesCategory =
        categoryFilter === "All" || task.category === categoryFilter;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [tasks, statusFilter, categoryFilter, searchTerm]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const getDifficultyClass = (taskDifficulty) => {
    return taskDifficulty.toLowerCase();
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="navbar">
        <div className="brand">
          <div className="logo">PP</div>

          <div>
            <h1>PlacementPrep</h1>
            <p>Track. Prepare. Get Placed.</p>
          </div>
        </div>

        <button
          className="theme-button"
          type="button"
          onClick={() => setDarkMode((currentMode) => !currentMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <span className="hero-badge">Placement Preparation Dashboard</span>

            <h2>
              Build consistency.
              <br />
              Crack your dream company.
            </h2>

            <p>
              Manage DSA questions, technical subjects and company preparation
              tasks from one simple dashboard.
            </p>
          </div>

          <div className="progress-card">
            <div className="progress-circle">
              <span>{progress}%</span>
            </div>

            <div>
              <h3>Overall Progress</h3>
              <p>
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon purple">📚</div>

            <div>
              <p>Total Tasks</p>
              <h3>{tasks.length}</h3>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon green">✅</div>

            <div>
              <p>Completed</p>
              <h3>{completedTasks}</h3>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon orange">⏳</div>

            <div>
              <p>Pending</p>
              <h3>{pendingTasks}</h3>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon blue">🎯</div>

            <div>
              <p>Success Rate</p>
              <h3>{progress}%</h3>
            </div>
          </article>
        </section>

        <section className="dashboard-grid">
          <aside className="form-card">
            <div className="section-heading">
              <div>
                <span>Add Preparation Task</span>
                <h3>Create a new goal</h3>
              </div>
            </div>

            <form onSubmit={addTask}>
              <label htmlFor="task-title">Task title</label>

              <input
                id="task-title"
                type="text"
                placeholder="Example: Solve Binary Search"
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
              />

              <label htmlFor="category">Category</label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="DSA">DSA</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
                <option value="Database">Database</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Interview">Interview</option>
              </select>

              <label htmlFor="difficulty">Difficulty</label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <button className="add-button" type="submit">
                + Add Task
              </button>
            </form>

            <div className="motivation">
              <span>💡 Daily Reminder</span>
              <p>
                Small progress every day creates powerful long-term results.
              </p>
            </div>
          </aside>

          <section className="tasks-card">
            <div className="tasks-header">
              <div>
                <span>Your preparation plan</span>
                <h3>Tasks</h3>
              </div>

              <button
                className="clear-button"
                type="button"
                onClick={clearCompletedTasks}
              >
                Clear completed
              </button>
            </div>

            <div className="filters">
              <input
                type="search"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="DSA">DSA</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
                <option value="Database">Database</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Interview">Interview</option>
              </select>
            </div>

            <div className="task-list">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <article
                    className={`task-item ${
                      task.completed ? "task-completed" : ""
                    }`}
                    key={task.id}
                  >
                    <button
                      className={`check-button ${
                        task.completed ? "checked" : ""
                      }`}
                      type="button"
                      aria-label={
                        task.completed
                          ? "Mark task as pending"
                          : "Mark task as completed"
                      }
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.completed ? "✓" : ""}
                    </button>

                    <div className="task-content">
                      <h4>{task.title}</h4>

                      <div className="task-tags">
                        <span className="category-tag">{task.category}</span>

                        <span
                          className={`difficulty-tag ${getDifficultyClass(
                            task.difficulty,
                          )}`}
                        >
                          {task.difficulty}
                        </span>

                        <span
                          className={`status-tag ${
                            task.completed ? "completed" : "pending"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>

                    <button
                      className="delete-button"
                      type="button"
                      aria-label={`Delete ${task.title}`}
                      onClick={() => deleteTask(task.id)}
                    >
                      🗑️
                    </button>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <div>📋</div>
                  <h4>No tasks found</h4>
                  <p>Add a new task or change your filters.</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

      <footer>
        <p>
          Built with React by <strong>Rahul Takale</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
