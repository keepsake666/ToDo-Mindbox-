import React from "react";
import styles from "./styles.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>TODOS</h1>
    </header>
  );
};
