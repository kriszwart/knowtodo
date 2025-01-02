import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listName: string) => void;
}

export function NewListModal({ isOpen, onClose, onSubmit }: NewListModalProps) {
  const [listName, setListName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(listName);
    setListName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-surface rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary">New List</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">List Name</label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter list name"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Create List</button>
          </div>
        </form>
      </div>
    </div>
  );
}
