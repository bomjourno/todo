import React, { useState } from 'react'
import { ITodo } from '../../types/types'
import { Todo } from '../Todo/Todo'
import './TodoList.scss'
import classNames from 'classnames'

interface TodoListProps {
  todos: ITodo[]
  onToggle: (id: number) => void
  onRemove: () => void
}

export const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
  const [sortedBy, setSortedBy] = useState<string>('')
  const completedTodos = todos.filter((todo) => todo.completed === false)

  const getStatusOfProgress = (itemsLeft: number, possible_text: string[]) => {
    if (itemsLeft == 1) {
      return `${itemsLeft} ${possible_text[0]}`
    }
    if (itemsLeft == 0) {
      return `${itemsLeft} ${possible_text[2]}`
    }
    return `${itemsLeft} ${possible_text[1]}`
  }

  const getTodos = (todos: ITodo[], sortedBy: string) => {
    switch (sortedBy) {
      case 'Completed':
        return todos.filter((todo) => todo.completed === true)
      case 'Active':
        return todos.filter((todo) => todo.completed === false)
      default:
        return todos
    }
  }

  return (
    <>
      <ul className='todolist'>
        {getTodos(todos, sortedBy).map((todo) => {
          return <Todo todo={todo} onToggle={onToggle} key={todo.id} />
        })}
      </ul>
      {todos.length !== 0 && (
        <div className='todolist__footer'>
          <div className='todolist__footer-items'>
            <span className='todolist__footer-status'>
              {getStatusOfProgress(completedTodos.length, [
                'item left',
                'items left',
                `- you've done everything!`,
              ])}
            </span>
          </div>
          <div className='todolist__footer-sortbar'>
            <button
              className={classNames('todolist__footer-sort', {
                active: sortedBy == 'All',
              })}
              onClick={() => setSortedBy('All')}
            >
              All
            </button>
            <button
              className={classNames('todolist__footer-sort', {
                active: sortedBy == 'Active',
              })}
              onClick={() => setSortedBy('Active')}
            >
              Active
            </button>
            <button
              className={classNames('todolist__footer-sort', {
                active: sortedBy == 'Completed',
              })}
              onClick={() => setSortedBy('Completed')}
            >
              Completed
            </button>
          </div>
          <button className='todolist__footer-clear' onClick={onRemove}>
            Clear completed
          </button>
        </div>
      )}
    </>
  )
}
