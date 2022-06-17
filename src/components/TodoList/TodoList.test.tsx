import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

test('renders todos', () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done?/i)

  expect(screen.queryByTestId('todo')).toBeNull()
  expect(input).toContainHTML('')
  userEvent.type(input, '123abc')
  userEvent.keyboard('{enter}')
  expect(input).toContainHTML('')
  expect(screen.queryByTestId('todo')).toBeInTheDocument()
  expect(screen.queryByText(/clear completed/i)).toBeInTheDocument()
  expect(screen.queryByTestId('todo')).toContainHTML('123abc')
})

describe('events of control panel todos', () => {
  test('All is default sort', () => {
    render(<App />)
    const input = screen.getByTestId('input')

    userEvent.type(input, '123abc')
    userEvent.keyboard('{enter}')
    expect(screen.getByTestId('All')).toHaveClass('active')
  })

  test('All sorting works', () => {
    render(<App />)
    const input = screen.getByTestId('input')

    userEvent.type(input, '123abc')
    userEvent.keyboard('{enter}')
    userEvent.click(screen.getByTestId('Completed'))
    expect(screen.queryByTestId('todo')).toBeNull()
    userEvent.click(screen.getByTestId('All'))
    expect(screen.queryByTestId('todo')).toBeInTheDocument()
  })

  test('Active sorting works', () => {
    render(<App />)
    const input = screen.getByTestId('input')

    userEvent.type(input, '123abc')
    userEvent.keyboard('{enter}')
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('todo')).toHaveClass('todo__completed')
    userEvent.click(screen.getByTestId('Active'))
    expect(screen.queryByTestId('todo')).toBeNull()
  })

  test('Completed sorting works', () => {
    render(<App />)
    const input = screen.getByTestId('input')

    userEvent.type(input, '123abc')
    userEvent.keyboard('{enter}')
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('todo')).toHaveClass('todo__completed')
    userEvent.click(screen.getByTestId('Completed'))
    expect(screen.queryByTestId('todo')).toBeInTheDocument()
  })

  test('Clear completed works', () => {
    render(<App />)
    const input = screen.getByTestId('input')

    userEvent.type(input, '123abc')
    userEvent.keyboard('{enter}')
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('todo')).toHaveClass('todo__completed')
    userEvent.click(screen.getByTestId('Clear completed'))
    expect(screen.queryByTestId('todo')).toBeNull()
  })
})
