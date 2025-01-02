import React, { useState } from 'react';
import { Home, CheckSquare, Calendar, User, Briefcase, Plus, LayoutGrid, Settings } from 'lucide-react';
import { workspaces } from '../data/workspaces';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  onFilterChange: (category: string | null) => void;
  onCreateNewList: () => void;
  onCreateNewWorkspace: () => void;
  privateLists: string[];
  workspaces: any[];
}

export function Sidebar({ onFilterChange, onCreateNewList, onCreateNewWorkspace, privateLists, workspaces }: SidebarProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = (category: string | null) => {
    setActiveFilter(category);
    onFilterChange(category);
  };

  return (
    <aside className="w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-gray-800 p-fluid-base flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold dark:text-dark-text-primary">KnowToDo</h2>
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Cameron Williamson</p>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-500 px-3 mb-2">Private</h3>
        <SidebarItem
          icon={Home}
          text="Home"
          count={11}
          active={activeFilter === null}
          onClick={() => handleFilter(null)}
        />
        <SidebarItem
          icon={CheckSquare}
          text="Completed"
          count={3}
          active={activeFilter === 'completed'}
          onClick={() => handleFilter('completed')}
        />
        <SidebarItem
          icon={Calendar}
          text="Today"
          count={4}
          active={activeFilter === 'today'}
          onClick={() => handleFilter('today')}
        />
        <SidebarItem
          icon={User}
          text="Personal"
          count={4}
          active={activeFilter === 'personal'}
          onClick={() => handleFilter('personal')}
        />
        <SidebarItem
          icon={Briefcase}
          text="Work"
          count={3}
          active={activeFilter === 'work'}
          onClick={() => handleFilter('work')}
        />
        {privateLists.map(list => (
          <SidebarItem
            key={list}
            text={list}
            active={activeFilter === list}
            onClick={() => handleFilter(list)}
          />
        ))}
        <button
          onClick={onCreateNewList}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Create new list</span>
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500 px-3 mb-2">Workspace</h3>
        {workspaces.map(workspace => (
          <button
            key={workspace.id}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <span className={`w-4 h-4 rounded flex items-center justify-center ${workspace.color}`}>
              {workspace.icon}
            </span>; {/* Added semicolon here */}
            <span>{workspace.name}</span>
          </button>
        ))}
        <button
          onClick={onCreateNewWorkspace}
          className="w-full flex items-center gap-2 px-3 py-2 mt-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Create new workspace</span>
        </button>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-3">
          <button className="flex items-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <ThemeToggle />
        </div>
        
        <div className="mt-4 flex items-center gap-3 px-3 py-2 dark:text-dark-text-secondary">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary truncate">Cameron Williamson</p>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">cameron@plan.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon?: React.FC<{ className?: string }>;
  text: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, text, count, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
        active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{text}</span>
      </div>
      {count !== undefined && 
        <span className="text-gray-400 dark:text-gray-500">{count}</span>
      }
    </button>
  );
}
