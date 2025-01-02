export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category?: 'work' | 'personal' | 'today';
}
