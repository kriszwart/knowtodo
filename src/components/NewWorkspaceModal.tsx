import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workspace: { name: string; color: string; icon: string }) => void;
}

export function NewWorkspaceModal({ isOpen, onClose, onSubmit }: NewWorkspaceModalProps) {
  const [workspace, setWorkspace] = useState({ name: '', color: 'bg-gray-100', icon: '💼' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(workspace);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-surface rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary">New Workspace</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Workspace Name</label>
            <input
              type="text"
              value={workspace.name}
              onChange={(e) => setWorkspace({ ...workspace, name: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workspace name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
            <select
              value={workspace.color}
              onChange={(e) => setWorkspace({ ...workspace, color: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bg-gray-100">Gray</option>
              <option value="bg-blue-100">Blue</option>
              <option value="bg-green-100">Green</option>
              <option value="bg-purple-100">Purple</option>
              <option value="bg-yellow-100">Yellow</option>
              <option value="bg-red-100">Red</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon</label>
            <input
              type="text"
              value={workspace.icon}
              onChange={(e) => setWorkspace({ ...workspace, icon: e.target.value })}
              className="w-full border rounded-lg p-2 text-gray-900 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workspace icon"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Create Workspace</button>
          </div>
        </form>
      </div>
    </div>
  );
}
