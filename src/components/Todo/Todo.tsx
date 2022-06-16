import React from 'react'
import { ITodo } from '../../types/types'
import './Todo.scss'

interface TodoProps {
  todo: ITodo
}

export const Todo = ({ todo }: TodoProps) => {
  return (
    <li className='todo'>
      <input type='checkbox' />
      <span>{todo.title}</span>
    </li>
  )
}
