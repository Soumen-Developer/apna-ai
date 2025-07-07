import React, { useState } from 'react';
import { Play, Download, Copy, Save, Code, Zap, Sparkles, FileCode, Terminal } from 'lucide-react';
import { useGenerateTextMutation } from '../services/geminiApi';
import { useAuth } from '@clerk/clerk-react';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const { isSignedIn } = useAuth();
  const [generateCode, { isLoading: isGenerating }] = useGenerateTextMutation();

  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;

    const codePrompt = `Generate ${language} code for: ${prompt}.
    Please provide clean, well-commented, production-ready code with proper error handling.
    Include explanations for complex logic.`;

    try {
      const response = await generateCode({
        prompt: codePrompt,
        temperature: 0.3,
        maxTokens: 2000
      }).unwrap();
      setGeneratedCode(response.text);
    } catch (error) {
      console.error('Code generation failed:', error);
      // Optionally display an error message to the user
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const downloadCode = () => {
    const extension = language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickExamples = [
    "Create a todo list app with React",
    "Build a weather widget with API integration", 
    "Make a responsive navbar component",
    "Create a login form with validation",
    "Build a REST API with Express.js",
    "Create a data visualization chart"
  ];

  return (
      <div className="max-w-7xl mx-auto p-6 h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-6 shadow-lg transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 flex items-center space-x-2">
                <span>Code Generator</span>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 mt-1">AI-powered code generation like Bolt.new</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-700/50">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Powered by Gemini</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Describe Your Code</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                Programming Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="react">React</option>
                <option value="html">HTML/CSS</option>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                Code Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build... e.g., 'Create a function that calculates fibonacci numbers', 'Build a responsive login form', 'Make a REST API endpoint'"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none h-40 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
                {prompt.length}/1000 characters
              </div>
            </div>

            <button
              onClick={handleGenerateCode}
              disabled={isGenerating || !prompt.trim() || !isSignedIn}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white p-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Generating Code...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Generate Code</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300 flex items-center space-x-2">
              <FileCode className="w-4 h-4" />
              <span>Quick Examples:</span>
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {quickExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-left p-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                    {example}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FileCode className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Generated Code</h2>
            </div>
            {generatedCode && (
              <div className="flex space-x-2">
                <button
                  onClick={copyCode}
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
                  title="Copy code"
                >
                  <Copy className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  onClick={downloadCode}
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200 group"
                  title="Download code"
                >
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200 group"
                  title="Save project"
                >
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            )}
          </div>

          <div className="h-full">
            {generatedCode ? (
              <div className="relative">
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <span className="px-3 py-1 bg-gray-900 dark:bg-gray-700 text-green-400 text-xs font-mono rounded-lg border border-gray-700 dark:border-gray-600">
                    {language}
                  </span>
                </div>
                <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 dark:text-green-300 p-6 rounded-xl overflow-auto h-96 text-sm border border-gray-700 dark:border-gray-600 font-mono leading-relaxed shadow-inner">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            ) : (
              <div className="h-96 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Code className="w-10 h-10 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300 text-lg font-medium mb-2">Generated code will appear here</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 transition-colors duration-300 max-w-sm mx-auto leading-relaxed">
                    {isSignedIn
                      ? 'Describe what you want to build and click "Generate Code" to see AI-powered results'
                      : 'Please sign in to generate code'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      );
};

export default CodeGenerator;
