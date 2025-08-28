import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import styles from "./styles.module.css";

interface AddTaskProps {
  onAddTask: (text: string) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText("");
    }
  };

  return (
    <div className={styles.addTaskContainer}>
      <h2 className={styles.title}>Добавить новую задачу</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите название задачи"
          variant="outlined"
          fullWidth
          required
          className={styles.input}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!text.trim()}
          className={styles.button}
        >
          Добавить
        </Button>
      </form>
    </div>
  );
};
