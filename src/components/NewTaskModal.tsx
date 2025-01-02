import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: { title: string; dueDate: string; priority: string, category: string }) => void;
}

export function NewTaskModal({ isOpen, onClose, onSubmit }: NewTaskModalProps) {
  const [task, setTask] = useState({ title: '', dueDate: '', priority: 'medium', category: 'today' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-surface rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary">New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
            <input
              type="datetime-local"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
