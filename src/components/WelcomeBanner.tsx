import React from 'react';
import { X } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg p-4 mb-6 flex items-start gap-3 relative">
      <span className="text-xl">💡</span>
      <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">
        Are you tired of juggling multiple tasks and deadlines? Our To-Do List app is here to simplify your life and
        boost your productivity. Whether it's work-related projects, household chores, or personal goals, we've got
        you covered.
      </p>
      <button className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
