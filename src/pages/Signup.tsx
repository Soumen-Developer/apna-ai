import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Zap, Sparkles, Star } from 'lucide-react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="max-w-md w-full space-y-8 relative">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-lg flex items-center justify-center space-x-2">
            <span>Join Apna AI and start building amazing things</span>
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          </p>
          
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Free to start</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>AI-powered</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 transition-colors duration-300">
            <SignUp 
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-sm normal-case font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
                  card: "bg-transparent shadow-none border-0",
                  headerTitle: "text-gray-900 dark:text-white text-2xl font-bold",
                  headerSubtitle: "text-gray-600 dark:text-gray-400",
                  socialButtonsBlockButton: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-105",
                  formFieldLabel: "text-gray-700 dark:text-gray-300 font-medium",
                  formFieldInput: "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200",
                  footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium",
                  dividerLine: "bg-gray-300 dark:bg-gray-600",
                  dividerText: "text-gray-500 dark:text-gray-400 font-medium",
                  identityPreviewText: "text-gray-700 dark:text-gray-300",
                  identityPreviewEditButton: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
                  formFieldSuccessText: "text-green-600 dark:text-green-400",
                  formFieldErrorText: "text-red-600 dark:text-red-400"
                }
              }}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Secure authentication powered by Clerk
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;