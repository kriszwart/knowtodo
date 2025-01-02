import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface NewTaskInputProps {
  onAdd: (text: string) => void;
}

export function NewTaskInput({ onAdd }: NewTaskInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 flex items-center gap-2">
        <Plus className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="New Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
        />
        <span className="text-xs text-gray-400">T</span>
      </div>
    </form>
  );
}
