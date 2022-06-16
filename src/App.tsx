import React, { useState } from 'react'
import './App.scss'
import { Header } from './components/Header/Header'
import { TodoForm } from './components/TodoForm/TodoForm'
import { TodoList } from './components/TodoList/TodoList'
import { ITodo } from './types/types'

function App() {
  const [todos, setTodos] = useState<ITodo[]>([])

  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTodos((prevVal) => [newTodo, ...prevVal])
  }

  const toggleHandler = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      }),
    )
  }

  const removeHandler = () => {
    setTodos((prev) => prev.filter((todo) => todo.completed == false))
  }

  return (
    <div className='main'>
      <Header />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        onRemove={removeHandler}
        onToggle={toggleHandler}
      />
    </div>
  )
}

export default App
