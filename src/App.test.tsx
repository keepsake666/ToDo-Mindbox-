import { render, screen } from "@testing-library/react";
import App from "./App";

describe("тест приложения", () => {
  test("заголовок есть на странице", () => {
    render(<App />);

    const title = screen.getByText("TODOS");
    expect(title).toBeInTheDocument();
  });

  test("есть кнопка добавить", () => {
    render(<App />);

    const button = screen.getByText("Добавить");
    expect(button).toBeInTheDocument();
  });

  test("есть текст про задачи", () => {
    render(<App />);

    const text = screen.getByText("Добавить новую задачу");
    expect(text).toBeInTheDocument();
  });
});
