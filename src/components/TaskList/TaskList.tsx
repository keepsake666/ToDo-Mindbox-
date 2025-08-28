import React, { useState } from "react";
import { Button } from "@mui/material";
import { DeleteSweep as DeleteSweepIcon } from "@mui/icons-material";
import styles from "./styles.module.css";
import { Task } from "../Task/Task";
import type { Task as TaskType } from "../../types/task";

interface TaskListProps {
  tasks: TaskType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
  getActiveTasksCount: () => number;
  getCompletedTasksCount: () => number;
  getActiveTasks: () => TaskType[];
  getCompletedTasks: () => TaskType[];
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  onClearCompleted,
  getActiveTasksCount,
  getCompletedTasksCount,
  getActiveTasks,
  getCompletedTasks,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    all: true,
    active: true,
    completed: true,
  });

  const activeTasksCount = getActiveTasksCount();
  const completedTasksCount = getCompletedTasksCount();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection("all")}
        >
          <h2 className={styles.sectionTitle}>Все задачи ({tasks.length})</h2>
          <span
            className={`${styles.expandIcon} ${
              expandedSections.all ? styles.expanded : ""
            }`}
          >
            ▼
          </span>
        </div>
        {expandedSections.all && (
          <div className={styles.taskList}>
            {tasks.length === 0 ? (
              <p className={styles.emptyMessage}>Нет задач</p>
            ) : (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection("active")}
        >
          <h2 className={styles.sectionTitle}>
            Невыполненные задачи ({activeTasksCount})
          </h2>
          <span
            className={`${styles.expandIcon} ${
              expandedSections.active ? styles.expanded : ""
            }`}
          >
            ▼
          </span>
        </div>
        {expandedSections.active && (
          <div className={styles.taskList}>
            {activeTasksCount === 0 ? (
              <p className={styles.emptyMessage}>Все задачи выполнены!</p>
            ) : (
              getActiveTasks().map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div
          className={styles.sectionHeader}
          onClick={() => toggleSection("completed")}
        >
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitle}>
              Выполненные задачи ({completedTasksCount})
            </h2>
            {completedTasksCount > 0 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearCompleted();
                }}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteSweepIcon />}
                size="small"
                className={styles.clearButton}
              >
                Очистить выполненные
              </Button>
            )}
          </div>
          <span
            className={`${styles.expandIcon} ${
              expandedSections.completed ? styles.expanded : ""
            }`}
          >
            ▼
          </span>
        </div>
        {expandedSections.completed && (
          <div className={styles.taskList}>
            {completedTasksCount === 0 ? (
              <p className={styles.emptyMessage}>Нет выполненных задач</p>
            ) : (
              getCompletedTasks().map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.stats}>
        <p>Осталось задач: {activeTasksCount}</p>
      </div>
    </div>
  );
};
