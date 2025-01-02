import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Bell } from 'lucide-react';
import { Todo } from '../types';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Todo>) => void;
  onOpenDetails: (task: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit, onOpenDetails }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [reminderActive, setReminderActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (todo.reminderTime) {
      const reminderDate = new Date(todo.reminderTime);
      const now = new Date();
      if (reminderDate > now) {
        const timeoutId = setTimeout(() => {
          setReminderActive(true);
          alert(`Reminder for task: ${todo.text}`);
        }, reminderDate.getTime() - now.getTime());

        return () => clearTimeout(timeoutId);
      }
    }
    setReminderActive(false);
  }, [todo.reminderTime, todo.text]);

  const handleEdit = () => {
    onEdit(todo.id, { text: newText });
    setIsEditing(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (action: string) => {
    if (action === 'edit') {
      setIsEditing(true);
    } else if (action === 'delete') {
      onDelete(todo.id);
    }
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  return (
    <div className="flex items-center gap-3 py-3 px-4 bg-white dark:bg-dark-surface rounded-lg group hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 border-2 border-gray-300 rounded checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          className="flex-1 text-gray-700 dark:text-gray-300 focus:outline-none"
        />
      ) : (
        <span
          onClick={() => onOpenDetails(todo)}
          className={`flex-1 text-gray-700 dark:text-gray-300 cursor-pointer ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}
        >
          {todo.text}
        </span>
      )}
      {todo.reminderTime && (
        <span className={`text-xs text-gray-400 dark:text-gray-500 ${reminderActive ? 'text-red-500' : ''}`}>
          {format(new Date(todo.reminderTime), 'h:mm a')}
          <Bell className={`w-4 h-4 inline-block ml-1 ${reminderActive ? 'text-red-500' : ''}`} />
        </span>
      )}
      <div className="relative">
        <button
          onClick={handleMenuToggle}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none rounded opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Task options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {isMenuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-10">
            <button
              onClick={() => handleMenuClick('edit')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleMenuClick('delete')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
