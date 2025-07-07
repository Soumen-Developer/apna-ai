export interface DashboardStat {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export interface RecentChatItem {
  id: number;
  title: string;
  date: string;
  messages: number;
  status: 'active' | 'completed';
}

export interface RecentProjectItem {
  id: number;
  title: string;
  language: string;
  date: string;
  status: 'completed' | 'draft';
  lines: number;
}
