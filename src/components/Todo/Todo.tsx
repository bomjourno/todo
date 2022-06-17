import React from 'react'
import './Todo.scss'
import classNames from 'classnames'
import { ITodo } from '../../types/types'

interface TodoProps {
  todo: ITodo
  onToggle: (id: number) => void
}

export const Todo = ({ todo, onToggle }: TodoProps) => {
  return (
    <li
      className={classNames('todo', {
        todo__completed: todo.completed,
      })}
      data-testid='todo'
    >
      <label className='todo__label' data-testid='label'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className='todo__title'>{todo.title}</span>
      </label>
    </li>
  )
}
