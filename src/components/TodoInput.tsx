import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 group bg-white p-3 rounded-lg border border-gray-200 shadow-sm focus-within:shadow-md transition-shadow">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Task"
        className="flex-1 px-2 py-1.5 text-gray-700 bg-transparent border-none focus:outline-none text-sm"
        aria-label="New task input"
      />
      <button
        type="submit"
        className="p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
        aria-label="Add task"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
}
