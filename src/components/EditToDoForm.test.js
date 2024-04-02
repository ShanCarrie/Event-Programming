import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EditTodoForm } from './EditTodoForm';

describe('EditTodoForm', () => {
  test('renders form with input field and button', () => {
    const editTodoMock = jest.fn();
    const task = { id: 1, task: 'Sample Task' };
    const { getByPlaceholderText, getByText } = render(
      <EditTodoForm editTodo={editTodoMock} task={task} />
    );

    const inputElement = getByPlaceholderText('Update task');
    const buttonElement = getByText('Update Task');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('updates task value on input change', () => {
    const editTodoMock = jest.fn();
    const task = { id: 1, task: 'Sample Task' };
    const { getByPlaceholderText } = render(
      <EditTodoForm editTodo={editTodoMock} task={task} />
    );

    const inputElement = getByPlaceholderText('Update task');
    fireEvent.change(inputElement, { target: { value: 'Updated Task' } });

    expect(inputElement.value).toBe('Updated Task');
  });

  test('calls editTodo function on form submission', () => {
    const editTodoMock = jest.fn();
    const task = { id: 1, task: 'Sample Task' };
    const { getByText } = render(
      <EditTodoForm editTodo={editTodoMock} task={task} />
    );

    const buttonElement = getByText('Update Task');
    fireEvent.click(buttonElement);

    expect(editTodoMock).toHaveBeenCalledTimes(1);
    expect(editTodoMock).toHaveBeenCalledWith('Sample Task', 1);
  });
});
