import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

test('renders todoform', () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done?/i)
  const clearButton = screen.queryByText(/clear completed/i)

  expect(input).toBeInTheDocument()
  expect(clearButton).toBeNull()
})

describe('input validation of todofrom', () => {
  test('input works', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/what needs to be done?/i)

    expect(input).toContainHTML('')
    userEvent.type(input, '123abc')
    expect(input).toContainHTML('123abc')
  })

  test('empty value', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/what needs to be done?/i)

    expect(input).toContainHTML('')
    userEvent.type(input, '')
    userEvent.keyboard('{enter}')
    expect(input).toContainHTML('')
  })

  test('max symbols', () => {
    render(<App />)
    const input = screen.getByTestId('input')

    expect(input).toContainHTML('')
    userEvent.type(input, '11111111111111111111111111111111111')
    userEvent.keyboard('{enter}')
    expect(screen.getByText('11111111111111111111111111111111111'))
    expect(screen.getByText(/max symbols is 35/i)).toBeInTheDocument()
  })
})
