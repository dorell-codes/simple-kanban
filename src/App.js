import React, { useState } from "react";
import Container from "./components/Container";
import Button from "./components/Button";
import Columns from "./components/Columns";

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
  const [columns, setColumns] = useState(null);
  const [tasks, setTasks] = useState(null);
  console.log("App -> tasks", tasks);

  React.useEffect(() => {
    fetch((process.env.API_URL || "http://localhost:1337") + "/columns")
      .then((res) => res.json())
      .then((result) => setColumns(result));

    fetch((process.env.API_URL || "http://localhost:1337") + "/tasks")
      .then((res) => res.json())
      .then((result) => setTasks(result));
  }, []);

  const handleClickAddColumn = (e) => {
    const label = prompt("What's the column name?");
    label && setColumns([...columns, { label, id: label.toLowerCase() }]);
  };

  const handleClickDeleteColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const handleClickAddTask = (columnId) => {
    const label = prompt("What's the task name?");

    if (label) {
      fetch((process.env.API_URL || "http://localhost:1337") + "/tasks", {
        method: "POST",
        body: JSON.stringify({
          label,
          column: columnId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("result", result);
          setTasks((prevTasks) => [...prevTasks, result]);
        });
    }

    label &&
      setTasks([
        ...tasks,
        { label, id: label.toLowerCase(), column: columnId },
      ]);
  };

  const handleClickDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTasksByColumnId = (tasks, columnId) => {
    return tasks.filter((task) => task.column.id === columnId);
  };

  return (
    <div>
      <h1>Simple Kanban</h1>

      <Container>
        <Columns
          data={{ columns, tasks }}
          actions={{
            handleClickDeleteTask,
            handleClickAddTask,
            handleClickDeleteColumn,
          }}
          getTasksByColumnId={getTasksByColumnId}
        />

        <div>
          <Button onClick={handleClickAddColumn}>Add Column</Button>
        </div>
      </Container>
    </div>
  );
}

export default App;
