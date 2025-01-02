import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { Sidebar } from './components/Sidebar';
import { TodoList } from './components/TodoList';
import { NewTaskModal } from './components/NewTaskModal';
import { TaskMetrics } from './components/TaskMetrics';
import { TaskDetailsModal } from './components/TaskDetailsModal';
import { Loading } from './components/Loading';
import { NewListModal } from './components/NewListModal';
import { NewWorkspaceModal } from './components/NewWorkspaceModal';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, loading } = useTodos();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const [privateLists, setPrivateLists] = useState<string[]>([]);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  const handleOpenTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  const handleFilterChange = (category: string | null) => {
    setFilterCategory(category);
  };

  const handleCreateNewList = () => {
    setIsNewListModalOpen(true);
  };

  const handleCloseNewListModal = () => {
    setIsNewListModalOpen(false);
  };

  const handleNewListSubmit = (listName: string) => {
    setPrivateLists(prev => [...prev, listName]);
    setIsNewListModalOpen(false);
  };

  const handleCreateNewWorkspace = () => {
    setIsNewWorkspaceModalOpen(true);
  };

  const handleCloseNewWorkspaceModal = () => {
    setIsNewWorkspaceModalOpen(false);
  };

  const handleNewWorkspaceSubmit = (workspace) => {
    setWorkspaces(prev => [...prev, workspace]);
    setIsNewWorkspaceModalOpen(false);
  };

  const filteredTodos = filterCategory
    ? todos.filter(todo => todo.category === filterCategory)
    : todos;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg font-sans">
      <Sidebar onFilterChange={handleFilterChange} onCreateNewList={handleCreateNewList} onCreateNewWorkspace={handleCreateNewWorkspace} privateLists={privateLists} workspaces={workspaces} />
      <main className="flex-1 p-8 overflow-y-auto dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto">
          <TaskMetrics todos={todos} />
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="w-full px-4 py-3 mb-4 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-600 rounded-lg flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            New Task
          </button>
          {loading ? (
            <Loading />
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onOpenDetails={handleOpenTaskDetails}
            />
          )}
        </div>
        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onSubmit={(task) => {
            addTodo(task.title);
            setIsNewTaskModalOpen(false);
          }}
        />
        <TaskDetailsModal
          isOpen={!!selectedTask}
          onClose={handleCloseTaskDetails}
          task={selectedTask}
          onEdit={editTodo}
        />
        <NewListModal
          isOpen={isNewListModalOpen}
          onClose={handleCloseNewListModal}
          onSubmit={handleNewListSubmit}
        />
        <NewWorkspaceModal
          isOpen={isNewWorkspaceModalOpen}
          onClose={handleCloseNewWorkspaceModal}
          onSubmit={handleNewWorkspaceSubmit}
        />
      </main>
    </div>
  );
}
