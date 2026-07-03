import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState('');
  const [todos, setTodos] = useState([]);
  const isFirstRender = useRef(true);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handleAddTodo = () => {
    if (tasks.trim()=== '') return;
    const newTodo = {
      id: Date.now(),
      text: tasks,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setTasks('');
  }
      const toggleCompleted = (id) => {
        const updatedTodos = todos.map ((todo) =>todo.id ===id? {...todo, completed: !todo.completed} : todo);
        setTodos(updatedTodos);
      }
      const deleteTodo = (id) => {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      }
  return (
    <div className="App">
      <h1>TODO App</h1>
      <div className="input-container">
        <input type="text" 
        placeholder="Enter a task..."
        value={tasks} 
        onChange={(e) => setTasks(e.target.value)}
        />
        <button type="submit" onClick={handleAddTodo}>
          Submit
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li 
          key={todo.id}
          style={{textDecoration: todo.completed? 'line-through': 'none'}}
          >
            {todo.text}
            <div ClassName="todo-buttons">
            <button onClick={() =>toggleCompleted (todo.id)}>{'\u2713'}</button>
            <button onClick={()=>deleteTodo (todo.id)}>{'\u{1f5d1}'}</button>
            </div> 
         </li>
          
        ))}
      </ul>
    </div>
  )
}

export default App
