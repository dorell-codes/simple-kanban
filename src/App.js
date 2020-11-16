import React, { useState } from "react";

let initialColumns = [
  {
    id: "todo",
    label: "Todo",
  },
  {
    id: "in-progress",
    label: "In Progress",
  },
  {
    id: "completed",
    label: "Completed",
  },
];
let initialTasks = [
  {
    id: "buy-eggs",
    label: "Buy Eggs",
    column: "todo",
  },
  {
    id: "cook-dinner",
    label: "Cook Dinner",
    column: "todo",
  },
  {
    id: "creating-mock-markup",
    label: "Creating Mock Markup",
    column: "in-progress",
  },
];

function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const handleClickAddColumn = (e) => {
    const label = prompt("What's the column name?");
    label && setColumns([...columns, { label, id: label.toLowerCase() }]);
  };

  const handleClickDeleteColumn = (columnId) => {
    setColumns((column) => columns.filter((column) => column.id !== columnId));
  };

  const handleClickAddTask = (columnId) => {
    const label = prompt("What's the task name?");
    label &&
      setTasks([
        ...tasks,
        { label, id: label.toLowerCase(), column: columnId },
      ]);
  };

  const handleClickDeleteTask = (taskId) => {
    setTasks((task) => tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Simple Kanban</h1>

      <div className="container">
        {columns.map((column) => (
          <div key={column.id} className="column">
            <h2>{column.label}</h2>

            {tasks
              .filter((task) => task.column === column.id)
              .map((task) => (
                <p className="task" key={task.id}>
                  {task.label}
                  <button
                    style={{ marginLeft: 5 }}
                    onClick={() => handleClickDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </p>
              ))}

            <button onClick={() => handleClickAddTask(column.id)}>
              Add Task
            </button>
            {/* Show only if column has no tasks */}
            {tasks.filter((task) => task.column === column.id).length <= 0 && (
              <button onClick={() => handleClickDeleteColumn(column.id)}>
                Remove Column
              </button>
            )}
          </div>
        ))}

        <div>
          <button onClick={handleClickAddColumn}>Add Column</button>
        </div>
      </div>
    </div>
  );
}

export default App;
