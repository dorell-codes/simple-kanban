import { useState, Fragment } from "react";

const initialColumns = [
  {
    id: "todo",
    label: "Todo",
    tasks: [],
  },
  {
    id: "ongoing",
    label: "In Progress",
  },
  {
    id: "completed",
    label: "Done",
    tasks: [],
  },
];

const initialTasks = [
  {
    id: "task-1",
    description: "Buy eggs 🥚",
    status: "todo",
  },
  {
    id: "task-2",
    description: "Bake cookies 🍪",
    status: "todo",
  },
  {
    id: "task-3",
    description: "Code React ⚛️",
    status: "ongoing",
  },
  {
    id: "task-4",
    description: "Smile today! 😊",
    status: "completed",
  },
];

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const handleClickAddColumn = (e) => {
    const label = prompt("What's the name of the column?");

    if (!label) {
      e.preventDefault();
      return;
    }

    setColumns((prev) => [
      ...prev,
      { label, id: label.toLowerCase(), tasks: [] },
    ]);
  };

  const handleClickDeleteColumn = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== columnId)
    );
  };

  const handleClickAddTask = (e, status) => {
    const description = prompt("What's the task about?");

    if (!description) {
      e.preventDefault();
      return;
    }

    setTasks((prev) => [
      ...prev,
      { id: description.toLowerCase(), description, status },
    ]);
  };

  const handleClickDeleteTask = (taskId) =>
    setTasks(tasks.filter((task) => task.id !== taskId));

  return (
    <div className="container-fluid">
      <div className="row">
        <h1>Simple Kanban</h1>
      </div>

      <div className="row">
        {columns.map((column) => (
          <Fragment key={column.id}>
            <div
              className="col"
              style={{
                background: `wheat`,
                padding: `20px`,
                border: `2px solid tomato`,
                borderRadius: 5,
                margin: 10,
              }}
            >
              <h2>{column.label}</h2>

              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="task"
                    style={{
                      border: `2px solid tomato`,
                      marginBottom: 10,
                      padding: 10,
                      backgroundColor: `whitesmoke`,
                      borderRadius: 5,
                    }}
                  >
                    <p>{task.description}</p>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleClickDeleteTask(task.id)}
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-x-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                      <span> Remove</span>
                    </button>
                  </div>
                ))}

              <button
                type="button"
                className="btn btn-light"
                variant="light"
                onClick={(e) => handleClickAddTask(e, column.id)}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-plus-circle"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
                <span> Add task</span>
              </button>

              {tasks.filter((task) => task.status === column.id).length ===
                0 && (
                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    variant="light"
                    onClick={() => handleClickDeleteColumn(column.id)}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-x-circle"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                    <span> Delete Column</span>
                  </button>
                </div>
              )}
            </div>
          </Fragment>
        ))}
        <div className="col">
          <form>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleClickAddColumn}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-plus-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
              <span> Add column</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
