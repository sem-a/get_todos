import React, { useEffect, useState } from "react";
import styles from "./index.module.css"; // Не забудьте указать правильный путь к файлу стилей!
import { Todo } from "../../types/todos";

const TodoList = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos"
            );
            if (!response.ok)
                throw new Error(
                    "Во время выполнения сетевого запроса произошла ошибка"
                );
            const data = await response.json();
            setTodoList(data); // Исправлено имя функции состояния на setTodoList
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Список задач</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <ul>
                    {todoList.map((todo) => (
                        <li
                            key={todo.id}
                            className={todo.completed ? styles.completed : ""}
                        >
                            {/* Применяем класс completed если задача выполнена */}
                            {todo.title} - Статус:{" "}
                            {todo.completed ? "Выполнено" : "Не выполнено"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
