import React from 'react'
import { ITodo } from '../../types/types'
import { Todo } from '../Todo/Todo'
import './TodoList.scss'

interface TodoListProps {
  todos: ITodo[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export const TodoList = ({ todos, onToggle }: TodoListProps) => {
  return (
    <>
      <ul className='todolist'>
        {todos.map((todo) => {
          return <Todo todo={todo} onToggle={onToggle} key={todo.id} />
        })}
      </ul>
      <div className='todolist__footer'></div>
    </>
  )
}
