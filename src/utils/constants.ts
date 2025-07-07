export const APP_CONFIG = {
  name: 'Apna AI',
  description: 'AI-powered platform for intelligent conversations and code generation',
  version: '1.0.0',
  author: 'Apna AI Team',
  
  // Features
  features: {
    chat: {
      enabled: true,
      maxMessagesPerDay: {
        free: 10,
        pro: -1, // unlimited
        enterprise: -1
      }
    },
    codeGeneration: {
      enabled: true,
      supportedLanguages: [
        'javascript',
        'python',
        'java',
        'cpp',
        'react',
        'html',
        'css',
        'typescript',
        'go',
        'rust'
      ]
    },
    authentication: {
      enabled: true,
      providers: ['email', 'google', 'github']
    }
  },

  // Pricing
  pricing: {
    free: {
      name: 'Free',
      price: 0,
      features: [
        '10 chat messages/day',
        'Basic code generation',
        'Community support'
      ]
    },
    pro: {
      name: 'Pro',
      price: 19,
      features: [
        'Unlimited chat messages',
        'Advanced code generation',
        'Priority support',
        'Save & export projects'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 99,
      features: [
        'Everything in Pro',
        'Custom AI training',
        'API access',
        'Dedicated support'
      ]
    }
  },

  // API Configuration
  api: {
    gemini: {
      model: 'gemini-pro',
      temperature: 0.7,
      maxTokens: 2000
    }
  },

  // Deployment
  deployment: {
    platform: 'render',
    environment: process.env.NODE_ENV || 'development',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000'
  }
};

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  CODE: '/code',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings'
};

export const STORAGE_KEYS = {
  USER_TOKEN: 'apna_ai_token',
  USER_DATA: 'apna_ai_user',
  CHAT_HISTORY: 'apna_ai_chats',
  CODE_PROJECTS: 'apna_ai_projects'
};