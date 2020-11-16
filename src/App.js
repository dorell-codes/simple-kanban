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
    setColumns([...columns, { label, id: label.toLowerCase() }]);
  };

  const handleClickAddTask = (columnId) => {
    const label = prompt("What's the task name?");
    setTasks([...tasks, { label, id: label.toLowerCase(), column: columnId }]);
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
                  <button style={{ marginLeft: 5 }}>Delete</button>
                </p>
              ))}

            <button onClick={() => handleClickAddTask(column.id)}>
              Add Task
            </button>
            {/* Show only if column has no tasks */}
            <button>Remove Column</button>
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
