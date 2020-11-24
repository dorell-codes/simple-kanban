import Button from "../components/Button";

function Columns({
  data: { columns, tasks },
  actions: {
    handleClickDeleteTask,
    handleClickAddTask,
    handleClickDeleteColumn,
  },
  getTasksByColumnId,
}) {
  if (!columns) {
    return null;
  }

  return columns.map((column) => (
    <div key={column.id} className="column">
      <h2>{column.label}</h2>

      {tasks &&
        getTasksByColumnId(tasks, column.id).map((task) => (
          <p className="task" key={task.id}>
            {task.label}
            <Button onClick={() => handleClickDeleteTask(task.id)}>
              Delete
            </Button>
          </p>
        ))}

      <Button onClick={() => handleClickAddTask(column.id)}>Add Task</Button>
      {tasks && getTasksByColumnId(tasks, column.id).length <= 0 && (
        <Button onClick={() => handleClickDeleteColumn(column.id)}>
          Remove Column
        </Button>
      )}
    </div>
  ));
}

export default Columns;
