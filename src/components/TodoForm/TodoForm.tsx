import React, { useState } from 'react'
import './TodoForm.scss'

interface TodoFormProps {
  addTodo(title: string): void
}

export const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState<string>('')

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  const handleKeyPress = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      addTodo(value)
      setValue('')
    }
  }

  return (
    <div className='todoform'>
      <input
        className='todoform__input'
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        type='text'
        placeholder='What needs to be done?'
      />
    </div>
  )
}
