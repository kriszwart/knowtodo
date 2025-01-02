import React, { useMemo } from 'react';
import { CheckCircle, TrendingUp, Clock, Zap } from 'lucide-react';
import { Todo } from '../types';

interface TaskMetricsProps {
  todos: Todo[];
}

export function TaskMetrics({ todos }: TaskMetricsProps) {
  const metrics = useMemo(() => {
    const completedToday = todos.filter(todo => todo.completed && isToday(new Date(todo.createdAt))).length;
    const completedThisWeek = todos.filter(todo => todo.completed && isThisWeek(new Date(todo.createdAt))).length;
    const completionRate = calculateCompletionRate(todos);

    return {
      completedToday,
      completedThisWeek,
      completionRate,
    };
  }, [todos]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        icon={CheckCircle}
        title="Tasks Completed"
        value={`${metrics.completedToday}/${metrics.completedThisWeek}`}
        subtitle="Today/This Week"
        color="text-green-500"
      />
      <MetricCard
        icon={TrendingUp}
        title="Completion Rate"
        value={`${metrics.completionRate}%`}
        subtitle="Last 7 Days"
        color="text-blue-500"
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

function MetricCard({ icon: Icon, title, value, subtitle, color }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className={`w-5 h-5 ${color}`} />}
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      </div>
      <p className="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{subtitle}</p>}
    </div>
  );
}

function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

function isThisWeek(date: Date): boolean {
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  return date >= weekStart && date <= weekEnd;
}

function calculateCompletionRate(todos: Todo[]): number {
  if (todos.length === 0) return 0;
  const completed = todos.filter(t => t.completed).length;
  return Math.round((completed / todos.length) * 100);
}
