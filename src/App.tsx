import { useState, useCallback } from "react";
import { Header } from "./components/Header/Header";
import { AddTask } from "./components/AddTask/AddTask";
import { TaskList } from "./components/TaskList/TaskList";
import type { Task } from "./types/task";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  const getActiveTasksCount = useCallback(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);

  const getCompletedTasksCount = useCallback(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const getActiveTasks = useCallback(() => {
    return tasks.filter((task) => !task.completed);
  }, [tasks]);

  const getCompletedTasks = useCallback(() => {
    return tasks.filter((task) => task.completed);
  }, [tasks]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <AddTask onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onClearCompleted={clearCompleted}
          getActiveTasksCount={getActiveTasksCount}
          getCompletedTasksCount={getCompletedTasksCount}
          getActiveTasks={getActiveTasks}
          getCompletedTasks={getCompletedTasks}
        />
      </main>
    </div>
  );
}

export default App;
