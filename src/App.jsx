
import React from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = React.useState([]);

  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getTodos = () => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  };

  React.useEffect(() => {
    const todos = getTodos();
    setTodos(todos);
  }, []);

  const addTodo = (title, description) => {
    if (!title || !description) {
      alert("Заповніть всі поля");
      return;
    }
    const newTodo = { title, description, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    saveTodos(newTodos);
    document.querySelector('input[placeholder="Todo title"]').value = "";
    document.querySelector('input[placeholder="Description"]').value = "";
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const editTodo = (index) => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");
    if (newTitle && newDescription) {
      const newTodos = [...todos];
      newTodos[index].title = newTitle;
      newTodos[index].description = newDescription;
      setTodos(newTodos);
      saveTodos(newTodos);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder="Todo title" type="text" />
        <input placeholder="Description" type="text" />
        <button
          className="todoBtn"
          type="submit"
          onClick={() =>
            addTodo(
              document.querySelector('input[placeholder="Todo title"]').value,
              document.querySelector('input[placeholder="Description"]').value
            )
          }
        >
          Create Todo
        </button>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th>Check</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      const newTodos = [...todos];
                      newTodos[index].completed = !newTodos[index].completed;
                      setTodos(newTodos);
                      saveTodos(newTodos);
                    }}
                  />
                </td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: todo.completed ? "green" : "red",
                    }}
                    onClick={() => {
                      const newTodos = [...todos];
                      newTodos[index].completed = !newTodos[index].completed;
                      setTodos(newTodos);
                      saveTodos(newTodos);
                    }}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </button>
                </td>
                <td>
                  <button
                    style={{ backgroundColor: "blue" }}
                    onClick={() => editTodo(index)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
