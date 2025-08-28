type Task = {
  id: string;
  text: string;
  completed: boolean;
};

function addTask(tasks: Task[], text: string) {
  const newTask: Task = {
    id: "1",
    text: text,
    completed: false,
  };
  return [...tasks, newTask];
}

function deleteTask(tasks: Task[], id: string) {
  return tasks.filter((task) => task.id !== id);
}

function clearCompleted(tasks: Task[]) {
  return tasks.filter((task) => !task.completed);
}

describe("тест функций", () => {
  test("добавить задачу", () => {
    const tasks: Task[] = [];

    const newTasks = addTask(tasks, "купить хлеб");
    expect(newTasks.length).toBe(1);
    expect(newTasks[0].text).toBe("купить хлеб");
  });

  test("удалить задачу", () => {
    const tasks: Task[] = [{ id: "1", text: "купить хлеб", completed: false }];

    const newTasks = deleteTask(tasks, "1");

    expect(newTasks.length).toBe(0);
  });

  test("очистить выполненные задачи", () => {
    const tasks: Task[] = [
      { id: "1", text: "купить хлеб", completed: true },
      { id: "2", text: "позвонить маме", completed: false },
    ];

    const newTasks = clearCompleted(tasks);

    expect(newTasks.length).toBe(1);
    expect(newTasks[0].text).toBe("позвонить маме");
  });
});
