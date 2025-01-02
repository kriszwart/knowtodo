import { useState, useEffect } from 'react';
import { Todo } from '../types';
import { tasks } from '../data/tasks';

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : tasks;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setLoading(true);
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: '',
      priority: 'medium',
      category: 'today',
      reminderTime: null,
    };
    setTodos(prev => [newTodo, ...prev]);
    setLoading(false);
  };

  const toggleTodo = (id: string) => {
    setLoading(true);
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    setLoading(false);
  };

  const deleteTodo = (id: string) => {
    setLoading(true);
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setLoading(false);
  };

  const editTodo = (id: string, updatedTask: Partial<Todo>) => {
    setLoading(true);
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updatedTask } : todo
      )
    );
    setLoading(false);
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    loading
  };
}
