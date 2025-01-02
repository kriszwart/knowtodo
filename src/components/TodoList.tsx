import React from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Todo>) => void;
  onOpenDetails: (task: Todo) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit, onOpenDetails }: TodoListProps) {
  // Group tasks by category
  const groupedTasks = todos.reduce((acc, todo) => {
    const category = todo.category || 'today';
    acc[category] = acc[category] || [];
    acc[category].push(todo);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedTasks).map(([category, tasks]) => (
        <div key={category} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">{category}</h2>
          <div className="space-y-2">
            {tasks.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
