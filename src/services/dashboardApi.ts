import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DashboardStat, RecentChatItem, RecentProjectItem } from '../types/dashboard';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust baseUrl as needed
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStat[], void>({
      query: () => 'dashboard/stats',
    }),
    getRecentChats: builder.query<RecentChatItem[], void>({
      query: () => 'dashboard/recent-chats',
    }),
    getRecentProjects: builder.query<RecentProjectItem[], void>({
      query: () => 'dashboard/recent-projects',
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentChatsQuery,
  useGetRecentProjectsQuery,
} = dashboardApi;
