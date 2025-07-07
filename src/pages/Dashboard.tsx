import React from 'react';
import { MessageCircle, Code, Plus, Calendar, Clock, Star, Zap, Save, TrendingUp } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useGetDashboardStatsQuery, useGetRecentChatsQuery, useGetRecentProjectsQuery } from '../services/dashboardApi';
import Loader from '../components/Loader';
import { DashboardStat, RecentChatItem, RecentProjectItem } from '../types/dashboard';

const iconComponents = {
  MessageCircle,
  Code,
  Save,
  TrendingUp,
};

const Dashboard = () => {
  const { user } = useUser();
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: recentChats, isLoading: chatsLoading } = useGetRecentChatsQuery();
  const { data: recentProjects, isLoading: projectsLoading } = useGetRecentProjectsQuery();

  if (statsLoading || chatsLoading || projectsLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Welcome Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
                <span>Welcome back, {user?.firstName || 'Developer'}!</span>
                <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
              </h1>
              <p className="text-blue-100 dark:text-blue-200 text-lg">
                Ready to build something amazing today? Here's what's happening with your AI projects.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">🚀</div>
                <div className="text-xs text-blue-200">Let's Code!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats?.map((stat: DashboardStat, index: number) => {
          const Icon = iconComponents[stat.icon as keyof typeof iconComponents];
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:scale-110 transform duration-200">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-all duration-300 group-hover:scale-110`}>
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Chats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Recent Chats</h2>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentChats?.map((chat: RecentChatItem) => (
              <div key={chat.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{chat.title}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{chat.messages} messages</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        chat.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      } transition-colors duration-300`}>
                        {chat.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                    <Clock className="w-3 h-3" />
                    <p className="text-sm transition-colors duration-300">{chat.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 group">
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Start New Chat</span>
          </button>
        </div>

        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Recent Projects</h2>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects?.map((project: RecentProjectItem) => (
              <div key={project.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">{project.title}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{project.language}</p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{project.lines} lines</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block ${
                    project.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                  } transition-colors duration-300`}>
                    {project.status}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <p className="text-sm transition-colors duration-300">{project.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 group">
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Generate New Code</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500 rounded-2xl p-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3 flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-300" />
                <span>Ready to build something amazing?</span>
              </h3>
              <p className="text-blue-100 dark:text-blue-200 text-lg leading-relaxed">
                Start a new chat or generate code with our AI assistant. The possibilities are endless!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>New Chat</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-200 transform hover:scale-105 border border-white/20 flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Generate Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
