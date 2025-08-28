import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import styles from "./styles.module.css";
import type { Task as TaskType } from "../../types/task";

interface TaskProps {
  task: TaskType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`${styles.task} ${task.completed ? styles.completed : ""}`}>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={styles.checkbox}
        color="primary"
      />
      <span className={styles.text}>{task.text}</span>
      <IconButton
        onClick={() => onDelete(task.id)}
        className={styles.deleteButton}
        aria-label="Удалить задачу"
        color="error"
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
