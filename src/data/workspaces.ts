export interface Workspace {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const workspaces: Workspace[] = [
  {
    id: 'odatask',
    name: 'Odatask',
    color: 'bg-purple-100',
    icon: '💼'
  },
  {
    id: 'nexus',
    name: 'Nexus',
    color: 'bg-blue-100',
    icon: '🚀'
  },
  {
    id: 'evrestudio',
    name: 'Evrestudio',
    color: 'bg-green-100',
    icon: '🎨'
  }
];
