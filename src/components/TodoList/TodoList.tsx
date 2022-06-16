import React from 'react'
import { ITodo } from '../../types/types'
import { Todo } from '../Todo/Todo'
import './TodoList.scss'

interface TodoListProps {
  todos: ITodo[]
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className='todolist'>
      {todos.map((todo) => {
        return <Todo todo={todo} key={todo.id} />
      })}
    </ul>
  )
}
