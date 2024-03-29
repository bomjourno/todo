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
  const [sortedBy, setSortedBy] = useState<string>('All')
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
              data-testid='All'
            >
              All
            </button>
            <button
              className={classNames('todolist__footer-sort', {
                active: sortedBy == 'Active',
              })}
              onClick={() => setSortedBy('Active')}
              data-testid='Active'
            >
              Active
            </button>
            <button
              className={classNames('todolist__footer-sort', {
                active: sortedBy == 'Completed',
              })}
              onClick={() => setSortedBy('Completed')}
              data-testid='Completed'
            >
              Completed
            </button>
          </div>
          <button
            className='todolist__footer-clear'
            onClick={onRemove}
            data-testid='Clear completed'
          >
            Clear completed
          </button>
        </div>
      )}
    </>
  )
}
