import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoDate from "./components/TodoDate";
import TodoContent from "./components/TodoContent";
import GlobalStyle from "./style/GlobalStyle";
import "./style/normalize.css";
import TodoCalendar from "./components/TodoCalendar";

function App() {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // YYYY-MM-DD 형식과 일치시키기 위해 한 자리 수면 앞에 0 붙임
    const day = String(today.getDate()).padStart(2, "0"); // YYYY-MM-DD 형식과 일치시키기 위해 한 자리 수면 앞에 0 붙임
    const formattedToday = `${year}-${month}-${day}`;
    setDate(formattedToday);
  }, []);

  // 투두 저장, 불러오기

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const getTodosForDate = (todos, date) => {
    return todos.filter((todo) => todo.date === date);
  };

  // 캘린더 열기 토글

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <>
      <GlobalStyle />
      <TodoDate date={date} />
      <TodoContainer>
        <TodoContent
          todos={getTodosForDate(todos, date)}
          setTodos={setTodos}
          date={date}
          setProgress={setProgress}
        />
        {showCalendar && (
          <TodoCalendar setDate={setDate} progress={progress} todos={todos} />
        )}
      </TodoContainer>
      <FloatingButton onClick={toggleCalendar}>📅</FloatingButton>
    </>
  );
}

export default App;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
  column-gap: 40px;
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 40px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff3898af;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
`;
