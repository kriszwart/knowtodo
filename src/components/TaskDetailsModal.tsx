import React, { useState, useEffect } from 'react';
import { X, Clock, Tag } from 'lucide-react';
import { Todo } from '../types';
import { format } from 'date-fns';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Todo | null;
  onEdit: (id: string, updatedTask: Partial<Todo>) => void;
}

export function TaskDetailsModal({ isOpen, onClose, task, onEdit }: TaskDetailsModalProps) {
  const [editedTask, setEditedTask] = useState<Partial<Todo>>({});

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (task) {
      onEdit(task.id, editedTask);
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-surface rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary">Task Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              name="text"
              value={editedTask.text || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={editedTask.dueDate || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select
              name="priority"
              value={editedTask.priority || 'medium'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={editedTask.category || 'today'}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={editedTask.description || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Add task description"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancel</button>
            <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
